const express = require("express");
const HEWAN = require("./models").Hewan;

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/hewan", async (req, res) => {
  await HEWAN.findAll()
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      res.send({
        message: error,
      });
    });
});


app.get("/hewan/:id", async (req, res) => {
  const hewanID = req.params.id;
  await HEWAN.findOne({
    where: {
      id: hewanID,
    },
  })
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      res.send({
        message: error,
      });
    });
});

// Create Hewan
app.post("/hewan", async (req, res) => {
  const body = req.body;
  const hewan = {
    nama: body["nama"],
    namaSpesies: body["namaSpesies"],
    umur: body["umur"],
  };

  try {
    await HEWAN.create(hewan);
    res.status(201).send(hewan);
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
});

// Update Hewan by ID
app.put("/hewan/:id", async (req, res) => {
  try {
    const hewanID = req.params.id;
    const body = req.body;
    const hewan = {
      nama: body["nama"],
      namaSpesies: body["namaSpesies"],
      umur: body["umur"],
    };

    await HEWAN.update(hewan, {
      where: {
        id: hewanID,
      },
    });
    res.status(200).send(hewan);
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
});

// Menghapus Hewan by ID
app.delete("/hewan/:id", async (req, res) => {
  try {
    const hewanID = req.params.id;

    await HEWAN.destroy({
      where: {
        id: hewanID,
      },
    });

    res.status(200).json({
      message: "Hewan wasa deleted successfully!",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

app.listen(port, () => {
  console.log("server is listening on port", port);
});
