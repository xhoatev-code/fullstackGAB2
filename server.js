require("dotenv").config({ quiet: true });
const { createClient } = require("@supabase/supabase-js");
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SECRET_KEY
);

const express = require("express");
const cors = require("cors");
const app = express();
const Port = 4000;

// Middleware
app.use(express.json());
app.use(cors())

//Welcome Endpoint
app.get("/", (req, res) => {
  res.send("Welcome to the backend API");
});

// Get reporter or all Incidents Endpoint
app.get("/api/incidents", async (req, res) => {
  let query = supabase
    .from("incidents")
    .select("*")
    .order("reported_on", { ascending: false });

  if (req.query.reporter_code) {
    query = query.eq("reporter_code", req.query.reporter_code);
  }
  const { data, error } = await query;
  if (error) {
    return res.status(400).json({ message: error.message });
  }
  res.json(data);
});

// Get single incident by id
app.get("/api/incidents/:id", async (req, res) => {
  const { error, data } = await supabase
    .from("incidents")
    .select("*")
    .eq("id", req.params.id)
    .maybeSingle();
  if (error) {
    return res.status(400).json({ message: error.message });
  }
  if (!data) {
    return res.status(404).json({ message: "Incident not found" });
  }
  res.json(data);
});

// Create new incident endpoint
app.post("/api/incidents", async (req, res) => {
  const {
    title,
    type,
    lga,
    community,
    description,
    status,
    severity,
    reporter_code,
  } = req.body;

  if (!title || !type || !lga || !community || !description) {
    return res.status(400).json({ message: "Please fill in every field" });
  }

  const reporter = await supabase
    .from("reporters")
    .select("id")
    .eq("code", reporter_code)
    .maybeSingle();
  if (!reporter) {
    return res
      .status(401)
      .json({ message: "Please sign in before sending a report" });
  }

  const { data, error } = await supabase
    .from("incidents")
    .insert({
      title: title,
      type: type,
      lga: lga,
      community: community,
      description: description,
      severity: severity,
      status: status,
      reporter_code: reporter_code,
    })
    .select()
    .single();

  if (error) {
    return res.status(400).json({ message: error.message });
  }
  res.status(201).json(data);
});

// Update incident status endpoint
app.put("/api/incidents/:id", async (req, res) => {
  if (req.get("x-admin-key") !== process.env.ADMIN_KEY) {
    return res.status(401).json({
      message: "Unathourized Request - Staff key is misssing or wrong",
    });
  }

  const { data, error } = await supabase
    .from("incidents")
    .update({
      status: req.body.status,
      status_reason: req.body.status_reason || "",
    })
    .eq("id", req.params.id)
    .select()
    .maybeSingle();

  if (error) {
    return res.status(400).json({ message: error.message });
  }

  if (!data) {
    return res.status(404).json({ message: "Incident not found" });
  }

  res.json(data);
});

// Delete incident endpoint
app.delete("/api/incidents/:id", async (req, res) => {
  if (req.get("x-admin-key") !== process.env.ADMIN_KEY) {
    return res.status(401).json({
      message: "Unathourized Request - Staff key is misssing or wrong",
    });
  }
  const { data, error } = await supabase
    .from("incidents")
    .delete()
    .eq("id", req.params.id)
    .select()
    .maybeSingle();
  if (!data) {
    return res.status(404).json({ message: "Incident not found" });
  }

  if (error) {
    return res.status(400).json({ message: error.message });
  }
  res.json({ message: "Incident deleted succesffully." });
});


// Reporter endpoints
app.get("/api/reporters", (req, res) => {

  res.json(reporters);
});

// Reporter signup endpoint
app.post("/api/reporters/signup", async (req, res) => {
  const { name, phone, community } = req.body;
  if (!name || !phone || !community) {
    return res.status(400).json({ message: "Please fill in every field" });
  }

  const existing_reporter = await supabase
    .from("reporters")
    .select("id")
    .eq("phone", phone)
    .maybeSingle();
  if (existing_reporter.data) {
    return res
      .status(400)
      .json({ message: "Reporter with this phone number already exists" });
  }
  const code = String(Math.floor(100000 + Math.random() * 900000));

  const { data, error } = await supabase
    .from("reporters")
    .insert({
      name: name,
      phone: phone,
      community: community,
      code: code,
    })
    .select()
    .single();

  if (error) {
    return res.status(400).json({ message: error.message });
  }

  res.status(201).json(data);
});

// Reporter login endpoint
app.post("/api/reporters/login", async (req, res) => {
  try {
    const { phone, code } = req.body;
    if (!phone || !code) {
      return res.status(400).json({ Success: false, message: "Please provide phone and code" });
    }

    const { data, error } = await supabase
      .from("reporters")
      .select("*")
      .eq("phone", req.body.phone)
      .eq("code", req.body.code)
      .maybeSingle();

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    if (!data) {
      return res.status(401).json({ message: "Invalid Reporter Credentials" });
    }

    // Successful login
    return res.status(200).json({
      Success: true,
      message: "Login successful",
      reporter: {
        id: data.id,
        name: data.name,
        phone: data.phone
      } 
    })

 
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong, please try again"
    });
  }


});

// Server listening status
app.listen(Port, () => {
  console.log(`Server running on port ${Port}`);
});