                                                                                
from kafka import KafkaProducer
import tweepy
import threading, logging, time
from kafka.client import KafkaClient
from kafka.consumer import SimpleConsumer
from kafka.producer import SimpleProducer
import string

######################################################################
# Authentication details. To  obtain these visit dev.twitter.com
######################################################################

consumer_key = 'uOaMoLQKDk1J2gUUW0rA81EJA'
consumer_secret = 'j0vBGFeWb5IifeAkvF95lopxFDe1G8hCk63wC3BPWIdMcdH3ib'
access_token = '4022479835-lP6yXe6E1suDrg2d84vSiee06fzqPvPdm9cxplg'
access_token_secret = 'hRtmvTv5GiBbrfftyVLAYLkqpCnw3iWQkcwgmpIP7Emz3'#QovqxQnw0hSPrKwFIYLWct3Zv4MeGMash66IaOoFyXNWs

mytopic='twitterstream_instructor'# ex. 'twitterstream', or 'test' ...

######################################################################
#Create a handler for the streaming data that stays open...
######################################################################

class StdOutListener(tweepy.StreamListener):

    #Handler
    ''' Handles data received from the stream. '''

    ######################################################################
    #For each status event
    ######################################################################

    def on_status(self, status):
        
        # Prints the text of the tweet
        #print '%d,%d,%d,%s,%s' % (status.user.followers_count, status.user.friends_count,status.user.statuses_count, status.user.id_str, status.user.screen_name)
        
        # Schema changed to add the tweet text
        print '%d,%d,%d,%s,%s' % (status.user.followers_count, status.user.friends_count,status.user.statuses_count, status.text, status.user.screen_name)
        message =  str(status.user.followers_count) + ',' + str(status.user.friends_count) + ',' + str(status.user.statuses_count) + ',' + status.text + ',' + status.user.screen_name
		# Stripping non pritable characters
		#The function filter(function, list) offers an elegant way to filter out #all the elements of a list, for which the function function returns True. 
		#The function filter(f,l) needs a function f as its first argument. f #returns a Boolean value, i.e. either True or False. This function will #be applied to every element of the list l. Only if f returns True will #the element of the list be #included in the result list.

        msg = filter(lambda x: x in string.printable, message)
		
		# Send the message to producer
        producer.send(mytopic, str(msg))
#        try:
#            #write out to kafka topic
#            producer.send_messages(mytopic, str(msg))
#        except Exception, e:
#            return True
        
        return True
       
    ######################################################################
    #Supress Failure to keep demo running... In a production situation 
    #Handle with seperate handler
    ######################################################################
 
    def on_error(self, status_code):

        print('Got an error with status code: ' + str(status_code))
        return True # To continue listening
 
    def on_timeout(self):

        print('Timeout...')
        return True # To continue listening

######################################################################
#Main Loop Init
######################################################################


if __name__ == '__main__':
    
    listener = StdOutListener()

    #sign oath cert

    auth = tweepy.OAuthHandler(consumer_key, consumer_secret)

    auth.set_access_token(access_token, access_token_secret)

    #uncomment to use api in stream for data send/retrieve algorythms 
    #api = tweepy.API(auth)

    stream = tweepy.Stream(auth, listener)

    ######################################################################
    #Sample delivers a stream of 1% (random selection) of all tweets
    ######################################################################
    producer = KafkaProducer(bootstrap_servers='ip-172-31-20-89.us-west-2.compute.internal:9092')

    stream.filter(track=['python', 'cloudera','BigData', 'Hadoop', 'Predictive', 'Quantum', 'bigdata', 'Analytics', 'IoT'])
#    client = KafkaClient("localhost:9092")
#    producer = SimpleProducer(client)

    ######################################################################
    #Custom Filter rules pull all traffic for those filters in real time.
    #Bellow are some examples add or remove as needed...
    ######################################################################
    #A Good demo stream of reasonable amount
    #stream.filter(track=['actian', 'BigData', 'Hadoop', 'Predictive', 'Quantum', 'bigdata', 'Analytics', 'IoT'])
    #Hadoop Summit following
    #stream.filter(track=['actian', 'hadoop', 'hadoopsummit'])