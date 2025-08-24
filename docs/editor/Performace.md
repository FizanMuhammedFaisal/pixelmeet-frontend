## Performance issues

I had a 500 x 350 width and height map in mind but after seeing the editor struggle i switch to a 200 x 100 map

I Think it is possible to optimize the editor more.
If there is 500X350 and 8 layers that is 1.4 million sprites on a screen that is too much for handling.

I think people are not gonna need 8 layers. so might decrease that too

Well this 200\*100 is also a big map. A 50 to 100 people stay in it with ease i guess. Phaser won't have this load because it is going to render the map as tilemap and we cant do that on the editor case it need to be editable.

For more people or more space one solution is provide with different rooms and in editor to able to switch between then we will need some kind of teleportation logic to be embedded into the map as well.
A space can have this multiple rooms i guess
