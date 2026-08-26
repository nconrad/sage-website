# Snowflake Classification

Hello! My name is Neelanshi Varia and I am a student at Northwestern University pursuing MS in Artificial Intelligence. During my undergraduate studies, I performed research in applications of Machine Learning in the Remote Sensing area, Conversational Artificial Intelligence and 360-degree Computer Vision. This summer at Argonne, I am working on a very interesting problem involving snowflakes! (Yes, isn’t that cool?) I am working on the classification of habits of snowflakes on images acquired real-time during snowfall and blizzards.

## Why study snowflakes?
The study of snowflakes isn’t just curiosity-driven research as one might think but also carries a lot of significance in terms of its usage and applications. Studying snowflake formation, snowflake structure and shape, crystallization and growth are some of the many areas the research has been carried out for years. Particularly, snowflake shape study has been of keen interests for its applications including storm prediction, more insight in precipitation microphysics, snowfall velocity prediction, water content prediction, snow-to-liquid ratio, etc. The snow habits help determine association with temperature and supersaturation in the clouds. It also helps to study prevention of breakdown accidents like greenhouse destruction, the collapse of a temporary building, traffic accidents, providing high-level information for various winter sports, etc.<sup>[[1](#references)]</sup>

![snowflakes](../imgs/snowflake.jpg)


> Image credits: Unsplash

## How to go about doing it?
We’ll need some snow and their pictures to classify their types. But well, unlike the cat v/s dog classification problem, it is very difficult to get pictures of individual annotated snowflakes as one can’t just go about taking single snowflake pictures with a phone camera and clear enough to determine their type! So a Multi-Angle Snowflake Camera (MASC) is put in place which is ground-based and captures pictures of snow (or rain) falling from three different angles alongside their fall velocity. Conventionally, these images are classified into types of snowflakes based on different image processing methods. It includes elliptical approximations, morphological processing, extraction of geometrical features like projected area, rotational symmetry, texture operators, etc. But as they say, every snowflake is unique and so it is difficult to use one framework or technique for snowflake habit classification.

This is where recent advent in Machine Learning and Deep Learning techniques come to the save! With increased computing power and data storage, deep learning techniques have been emerging at an enormous rate with results much better than conventional statistical or image processing methods in almost all the fields. For the current project, my goal is to use a Deep Learning algorithm on pre-processed images coming from a MASC set up somewhere in a snowfall area to a Waggle node and identify the habit of the snowflakes.

## The approach
At a high level, Machine Learning is a type of AI that learns to do tasks based on given data and expected on output on its own without having to specify instructions. Amongst other useful methods, neural networks are one of the most popular and used areas since it carries the ability to understand and process very complex features and relationships in given data and give better results. Neural networks, inspired by neural connections in the human brain, consists of different layers made up of interconnected neurons. A neural network has an input layer where we feed in the data or the input signal, hidden layers where most of the computation and learning occurs and an output layer, where we get the results. Deep learning is a subset of Machine Learning where it has more number of hidden layers – requiring more compute and giving better results for a given task.

For the current task, I am using a Convolutional Neural Network (CNN) which are variants of neural networks mostly used in Computer Vision tasks. Convolution operates on an input data and a kernel which acts as a filter on the input image, producing an output image (hence it takes two images and gives the third one as output). <sup>[[2](#references)]</sup>



![snowflakes](../imgs/snowflake-cnn.png)

> Image credits: Vibhor Nigam, Towards Data Science blog at Medium <sup>[[3](#references)]</sup>

Here, convolutional layers take the original data and create feature maps from. Pooling is sample-based discretization, where a region is selected and we consider the max/min value in that region to represent it, hence downsampling the images (one can imagine it as something like low-quality images taken from a lower MP camera). Fully Connected Layers are neural networks, where all neurons are connected fully. Those were a lot of jargons, but how does the classification happen?

## Getting the ingredients ready
The images coming from MASC are sometimes blurred because of high velocity of snowflakes, sometimes has overlapped snowflakes and sometimes have no images at all. Hence the data is pre-processed by Prof. Aaron Kennedy’s team at the University of North Dakota which includes removal of unfit images and manually labelling the type of snowflake in a particular image.

We currently have 9 types of snowflakes with a total of around 550 images. Now the deep neural networks require a lot of data to learn better. And so I performed data augmentation using different techniques like flipping, rotating, shifting and zooming the snowflakes which amplified the dataset size 10 times resulting in around 5800 images. These images are fed to the input layers of CNN which in turn gives us the probability of snowflake type of each image at the output layer. Once we do some tuning of this network for optimum results, this model can take any image and give output type for that image.

## What next?
As I mentioned, these images require preprocessing before the algorithm can actually predict the snowflake type and hence it will be very useful if that step can be added to the pipeline such that the data from camera setup directly transfers to the Beehive on the Waggle network and the algorithm processes it before classifying the images. Data is the new fuel and quite expensive because more the data better the machine works. But in a task like this, it requires a lot of fieldwork in rough weather conditions and manual work to label the images for training, and so slowly and gradually the dataset can expand which will result in better classification results. Very few research projects have used Machine Learning and even fewer have used Deep Nets like CNN for this task and so it would be worthwhile to investigate the usage of a combination of most recent deep neural networks like Deep CNN and variants of FCN for the current problem.

I am thankful to my mentors and team at Sage for giving me this wonderful opportunity and guiding me through such an interesting problem. I would also love to hear any feedback that you may have via Linkedin or Twitter!

## References:
1. Seo, Won-Seok & Eun, Seung-Hee & Kim, Byung-Gon & Ko, A-Reum & Seong, Dae-Kyeong & Lee, Gyu-Min & Jeon, Hye-Rim & Han, Sang-Ok & Park, Young-San. (2015). Study on Characteristics of Snowfall and Snow Crystal Habits in the ESSAY (Experiment on Snow Storms At Yeongdong) Campaign in 2014. Atmosphere. 25. 261-270. 10.14191/Atmos.2015.25.2.261.

2. https://www.cs.cornell.edu/courses/cs1114/2013sp/sections/S06_convolution.pdf

3. https://towardsdatascience.com/understanding-neural-networks-from-neuron-to-rnn-cnn-and-deep-learning-cd88e90e0a90





