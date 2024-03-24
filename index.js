const express = require('express');
const Replicate = require('replicate');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Replicate Authentication
const replicate = new Replicate({
  auth: 'r8_6LJBhGwHY0vwSdiG8fDyWdh2hgoB9sz1SbNjI',
});

// API {/api/getImage} pass on the Data and Generate the Image
app.post('/api/getImage', async (req, res) => {
  const requestData = req.body;
  
  const {
    image_path,
    prompt,
    negative_prompt,
    pixel,
    scale,
    guidance_scale,
    num_inference_steps,
    manual_seed,
    image_num
  } = requestData;

  const output = await replicate.run(
    'visoar/product-photo:edf42659dae0da88a26dba4912e7e4bb6c2fba25b1e1c6a5464cf220e467bce0',
    {
      input: {
        image_path,
        prompt,
        negative_prompt,
        pixel,
        scale,
        guidance_scale,
        num_inference_steps,
        manual_seed,
        image_num
      },
    }
  );

  console.log(output);
  
  res.json({ message: 'Image generated successfully',status:200,data: output });
});


app.listen(3000, () => {
  console.log('listening on port 3000');
});