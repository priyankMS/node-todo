const { TYPE } = require("../config/constant");

const checkPostDataMiddleware = (req, res, next) => {
  let body = "";

  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", () => {
    let parsedBody = {};
    try {
      parsedBody = JSON.parse(body);
      console.log("body", body);
    } catch (e) {
      console.error("Failed to parse JSON:", e);
      res.writeHead(400, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ message: "Invalid JSON" }));
    }

    const { title, description, type } = parsedBody;
    console.log("type", type);
    if (!title && !description) {
      res.writeHead(400, { "Content-Type": "application/json" });
      return res.end( JSON.stringify({ message: "Title or description must be provided" }) );
    }

    if (!title) {
      res.writeHead(400, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ message: "Title required" }));
    }
    if (!description) {
      res.writeHead(400, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ message: "Description required" }));
    }
    if (typeof title !== "string" || typeof description !== "string") {
      res.writeHead(400, { "Content-Type": "application/json" });
      return res.end(  JSON.stringify({ message: "Title and description must be strings" }));
    }
    if (TYPE.includes(type) === false) {
      res.writeHead(400, { "Content-Type": "application/json" });
      return res.end(  JSON.stringify({ message: `Type must be one of ${TYPE.join(", ")}` }));
    }

    // Attach parsed body to request object
    req.body = { title, description };
    console.log("Calling next function");
    next();
  });
};

const updateDataMiddlerware = (req, res, next) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  let parseData = {};
  req.on("end", () => {
    try {
      parseData = JSON.parse(body);

      console.log(Object.keys(parseData));
    } catch (error) {
      console.error("failed to parse Json", error);
      res.writeHead(400, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ message: "Invalid JSON" }));
    }
    const { title, description } = parseData;
    //title validation
    if (
      (!title || typeof title !== "string" || title.trim() === "") &&  (!description ||typeof description !== "string" ||  description.trim() === "")
    ) {
      res.writeHead(400, { "Content-Type": "application/json" });
      return res.end( JSON.stringify({ message:   "Both title and description must be provided and cannot be empty ", }));
    }

    Object.keys(parseData).forEach((key) => {
      if (key === "title") {
        if (typeof title !== "string" || title.trim() === "") {
          res.writeHead(400, { "Content-Type": "application/json" });
          return res.end(   JSON.stringify({    message: "Title must be a non-empty string",  }) );
        }
        
      } else if (key === "description") {
        if (typeof description !== "string" || description.trim() === "") {
          res.writeHead(400, { "Content-Type": "application/json" });
          return res.end( JSON.stringify({  message: "Description must be a non-empty string",  })  );
        }
      }
    });

    // Validate description

    //parse body to request
    req.body = { title, description };
    console.log("calling next function in update validation");
    next();
  });
};

module.exports = { checkPostDataMiddleware, updateDataMiddlerware };
