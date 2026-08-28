---
sidebar_position: 13
sidebar_label: Weather Image Classification
keywords: [Sage Summer Camp, Weather, Image Classification, Edge Computing]
tags: [Sage Summer Camp, Weather, Image Classification, Edge Computing]
---

# Calculate Edge Detection Weather AI

A preprocessing library for selecting images based on sensor data that would be beneficial to AI preprocessing for finding images of weather and automatically using the images in a Image Classification Network.

![Tornado API](/img/science/weather-image-classification/tornado-api.png)

<sub>In Natural Weather there are specific indicators that are indicatative before a storm</sub>

I picked an extreme weather event tornados as a severe event that I want to be able to predict. I thought that a good movie example was Twister. If there are dry, windy conditions for a sustained period of time in a flat land of area, then a tornado has a good chance of forming there. In Chicago, we also get a few tornados but not quite as many as a place such as Kansas which was the location of the twister movie. In order to predict the tornados back before TWS then you would have storm chasers with radars who would get to the storm and take measurements as close to the tornado as they could get. It was a very dangerous profession and these days it is much more computer automated.

Image Classification models use millions of neurons to classify an image. Our cameras range in resolution, zoom, and location. I imagined it would be difficult to accurately classify images based on pure data since images would be located from areas with pretty signifigantly different geography. It is still important today if we don't predict tornados in Chicago despite how rare they are then then people and property could be injured. I think that something we have been experiencing recently is poor weather quality in Chicago. As the windy city is so appropriately named, we have a lot of air quality sensors which indicate us of harmful air quality before the event so we can remain indoors or if we have to be outdoors then properly choose respiratory equiptment based on how severe you feel about inhaling dust and irritants. For a person with asthma, I think it's good that we have warning systems.

![Particulate Matter Sensor Down](/img/science/weather-image-classification/particulate-matter-sensor-down.png)

![Does our sensor still have life?](/img/science/weather-image-classification/sensor-life.png)

Steps to create a model that will classify images.

## 1: Pick a Machine Learning Library (pytorch)

Use an existing ML library that works with Python. An image classifier typically uses two types of data. The label is what the image is called and needs to be accurate to have good results. The image with the weather accurately identified. The larger the model is, the more accurate will our final results will be.

```
Use the Sequential()
```

## 2: Flatten the image into pixels

Modify the image in the camera to have the correct number of pixels for the network. A different configuration would be to build our data set using preprocessed images and using our best images we take in the classification network. The network should hold a large amount of data in order to give longterm results.

```
Use layer.Flatten() or np.flatten()
```

## 3: Predict the image

Create two different sets of data by allocation a portion of your test images as a validation set. My data is called X and y.

```
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.4)
model.fit(snapshot_img)
```

The image should have certain fits based on the classes you defined.

Go into the Github and download CalculateDistance.py. This is a model file of a Tornado that I created. This generates an image of a reverse funnel but right now it's a tube. The points are modeled from the origin at x=25,y=25,z=0 to the points on the spiral that are moving with velocity. This model has demonstrated an important example of sheer vectors which increase as the tornado widens near the top. Calculate a visual simulation of a hodograph is an end goal of this project. Placing lines from point to point may not demonstrate the exactly where the next particle will be but rather the centrifugal force of a tornado in my opinion.

## Why is this important?

Rather than wait for eruptions, volcanologists realized they could determine dormant and erruption periods. Our modern day society moved away from volcanos. It was definitely a good idea because it would be mildly inconvenient to be living next to an active volcano. Modern day societies don't have time to deal with sensitivity to air, we filtrate and remove harmful particles from air and water through government sized waste treatment plants and regulations to protect the air. Giving into a reasonable amount of tornados is the societies obliged role but staying safe in weather is vitally important and critically predicting incoming weather will be the future role of weather services.

## Project Outcomes

![Tornado Cone](/img/science/weather-image-classification/tornado-cone.png)

Source and development space: [huggingface.co/spaces/nateseveryns/Dev](https://huggingface.co/spaces/nateseveryns/Dev).
