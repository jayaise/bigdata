# Import Libraries
from pyspark import SparkConf, SparkContext

# Create spark context object
sc = SparkContext()

#-----------------------Regular expression -------------------------------#
APACHE_ACCESS_LOG_PATTERN = '^(\S+) (\S+) (\S+) \[([\w:/]+\s[+\-]\d{4})\] "(\S+) (\S+)\s*(\S*)\s*" (\d{3}) (\S+)'

#--------------------------------------------------------------------------#
#-----------------------Function to extract patterns ----------------------#
#--------------------------------------------------------------------------#
import re                        #Import regular expression package
import datetime          #Import datetime package

from pyspark.sql import Row      # Import Row function


# Dictionary with month and relevant number

month_map = {'Jan': 1, 'Feb': 2, 'Mar':3, 'Apr':4, 'May':5, 'Jun':6, 'Jul':7,
    'Aug':8,  'Sep': 9, 'Oct':10, 'Nov': 11, 'Dec': 12}


# Function for extracting date information from time stamp 
def parse_apache_time(s):
    """ Convert Apache time format into a Python datetime object
    Args:
        s (str): date and time in Apache time format
    Returns:
        datetime: datetime object (ignore timezone for now)
    """
	# dd/mon/yyyy:hh:mm:ss
    return datetime.datetime(int(s[7:11]), # year
                             month_map[s[3:6]], # month
                             int(s[0:2]), # day
                             int(s[12:14]), # hour
                             int(s[15:17]), #mins
                             int(s[18:20])) # secs


def parseApacheLogLine(logline):
    """ Parse a line in the Apache Common Log format
    Args:
        logline (str): a line of text in the Apache Common Log format
    Returns:
        tuple: either a dictionary containing the parts of the Apache Access Log and 1,
               or the original invalid log line and 0
    """
    match = re.search(APACHE_ACCESS_LOG_PATTERN, logline) # Matching pattern with each element
    size_field = match.group(9)                           # Get size fields
    if size_field == '-':      
        size = long(0)               # make it zero
    else:
        size = long(match.group(9))  # else convert it to long format
    return (Row(            # Return the extracted data in row format for easy access
        host          = match.group(1),
        client_identd = match.group(2),
        user_id       = match.group(3),
        date_time     = parse_apache_time(match.group(4)),
        method        = match.group(5),
        endpoint      = match.group(6),
        protocol      = match.group(7),
        response_code = int(match.group(8)),
        content_size  = size
    ))

	
#---------------- Create RDD --------------
import sys
import os
logFilePath = 'sparkProject/apache.access.log.PROJECT' #Mention the path of file on HDFS
logRDD = sc.textFile(logFilePath)

# Parsing log file and extracting structure out of data
parsed_logs = logRDD.map(parseApacheLogLine).cache()

# Check the number of elements
print("Number of elements: ",parsed_logs.count())
