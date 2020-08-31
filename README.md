# Dooropener

Imagine living with 19 roommates, and the doorbell goes off. Will _everybody_ open the door? Or will _nobody_ do it? You guessed right.

Using this tool, it gives every user at home a phone notification when the pizza man presses the doorbell. If you decide to open the door, you press on the button so 
that the rest knows the door is being opened and can stay on the couch. 


### How it works
Using a Raspberry Pi with a RF 433Mhz receiver, we can capture the press on the doorbell that activates not only the alarm, 
but also sends a push notification to every user currently in the house (which we can track using whether someone is connected to the local wifi!).


### Tools
- HTML5 & Javascript. Run in the browser so nobody complains about downloading an app.
- Gulp to automate builds and continuous integration
- Firebase to deal with the backend and to make sure everybody gets realtime updates arriving on time.



(Hobby project)
