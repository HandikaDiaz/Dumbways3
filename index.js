// ============================================================
const express = require("express");
const { create } = require("hbs");
const app = express();
const port = 3000;
// ============================================================
// Set Up File
app.set("view engine", "hbs");
app.set("views", "views");
// Set Up File
// ============================================================
// Set Up Internal Folder
app.use("/data", express.static("data"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const blog = [];
// Set Up Internal Folder
// ============================================================
// Routing GET
app.get("/", renderIndex);
app.get("/profile", renderProfile);
app.get("/project", renderProject);
app.get("/testimonial", renderTestimonial);
app.get("/contact", renderContact);
app.get("/project-detail/:blog_id", renderProjectDetail)
app.get("/edit/:blog_id", renderEditProject);
app.get("/delete/:blog_id", renderDeleteProject);
// Routing GET
// ============================================================
// Routing POST
app.post("/", addProject)
app.post("/edit/:blog_id", editProject)
// Routing POST
// ============================================================
// Function
function renderIndex(req, res) {
    const distanceTime = blog.map(project => ({
        ...project,
        time_ago: getDistanceTime(project.createdAt)
    }));

    res.render("index", {
        data: distanceTime
    });
};
function renderProfile(req, res) {
    res.render("profile");
};
function renderProject(req, res) {
    res.render("project");
};
function addProject(req, res) {
    let miliSecond = 1000;
    let secondInHour = 3600;
    let hourInDay = 24;
    let dayInHour = 30;
    let monthInYear = 12;

    const startDate = new Date(req.body.startDate);
    const endDate = new Date(req.body.endDate);
    const durationDate = Math.abs(endDate - startDate);
    const durationYear = Math.floor(durationDate / (miliSecond * secondInHour * hourInDay * dayInHour * monthInYear));
    const durationMonth = Math.floor(durationDate / (miliSecond * secondInHour * hourInDay * dayInHour)) % monthInYear;
    const durationDay = Math.floor(durationDate / (miliSecond * secondInHour * hourInDay)) % dayInHour;

    let duration = '';

    if (durationYear > 1) {
        duration += `${durationYear} Years `;
    } else if (durationYear === 1) {
        duration += `${durationYear} Year `;
    }

    if (durationMonth > 1) {
        duration += `${durationMonth} Months `;
    } else if (durationMonth === 1) {
        duration += `${durationMonth} Month `;
    }

    if (durationDay > 1) {
        duration += `${durationDay} Days`;
    } else if (durationDay === 1) {
        duration += `${durationDay} Day`;
    }

    const checkSwift = '<i class="fa-brands fa-swift p-2 g-col-6"></i>';
    const checkRuby = '<i class="fa-solid fa-gem p-2 g-col-6"></i>';
    const checkPhyton = '<i class="fa-brands fa-python p-2 g-col-6"></i>';
    const checkJavascript = '<i class="fa-brands fa-js p-2 g-col-6"></i>';

    const newBlog = {
        id: blog.length + 1,
        project: req.body.project,
        description: req.body.description,
        start: req.body.startDate,
        end: req.body.endDate,
        swift: req.body.swift ? checkSwift : null,
        ruby: req.body.ruby ? checkRuby : null,
        python: req.body.python ? checkPhyton : null,
        javascript: req.body.javascript ? checkJavascript : null,
        duration: duration,
        createdAt: new Date()
    };

    blog.push(newBlog);
    res.redirect("/");
};
function renderTestimonial(req, res) {
    res.render("testimonial");
};
function renderContact(req, res) {
    res.render("contact");
};
function renderProjectDetail(req, res) {
    const id = req.params.blog_id;
    const blogs = blog.find(blogs => blogs.id == id);

    res.render("project-detail", {
        data: blogs
    });
};
function renderEditProject(req, res) {
    const id = req.params.blog_id;
    const blogs = blog.find(blogs => blogs.id == id);
    console.log(blogs);

    res.render("project-edit", {
        data: blogs
    });
};
function editProject(req, res) {
    let miliSecond = 1000;
    let secondInHour = 3600;
    let hourInDay = 24;
    let dayInHour = 30;
    let monthInYear = 12;

    const startDate = new Date(req.body.startDate);
    const endDate = new Date(req.body.endDate);
    const durationDate = Math.abs(endDate - startDate);
    const durationYear = Math.floor(durationDate / (miliSecond * secondInHour * hourInDay * dayInHour * monthInYear));
    const durationMonth = Math.floor(durationDate / (miliSecond * secondInHour * hourInDay * dayInHour)) % monthInYear;
    const durationDay = Math.floor(durationDate / (miliSecond * secondInHour * hourInDay)) % dayInHour;

    let duration = '';

    if (durationYear > 1) {
        duration += `${durationYear} Years `;
    } else if (durationYear === 1) {
        duration += `${durationYear} Year `;
    }

    if (durationMonth > 1) {
        duration += `${durationMonth} Months `;
    } else if (durationMonth === 1) {
        duration += `${durationMonth} Month `;
    }

    if (durationDay > 1) {
        duration += `${durationDay} Days`;
    } else if (durationDay === 1) {
        duration += `${durationDay} Day`;
    }

    const checkSwift = '<i class="fa-brands fa-swift p-2 g-col-6"></i>';
    const checkRuby = '<i class="fa-solid fa-gem p-2 g-col-6"></i>';
    const checkPhyton = '<i class="fa-brands fa-python p-2 g-col-6"></i>';
    const checkJavascript = '<i class="fa-brands fa-js p-2 g-col-6"></i>';

    const id = req.params.blog_id;
    const newProject = {
        id: id,
        project: req.body.project,
        description: req.body.description,
        start: req.body.startDate,
        end: req.body.endDate,
        swift: req.body.swift ? checkSwift : null,
        ruby: req.body.ruby ? checkRuby : null,
        python: req.body.python ? checkPhyton : null,
        javascript: req.body.javascript ? checkJavascript : null,
        duration: duration,
        createdAt: blog.find(blogs => blogs.id == id).createdAt
    };
    const index = blog.findIndex(blogs => blogs.id == id);

    blog[index] = newProject;
    res.redirect("/")
};
function renderDeleteProject(req, res) {
    const id = req.params.blog_id;
    const index = blog.findIndex(blogs => blogs.id == id);

    blog.splice(index, 1);
    res.redirect("/");
}
// Function
// ============================================================
// Add Function
function getDistanceTime(time) {
    let postTime = time;
    let currentTime = new Date();

    let distanceTime = currentTime - postTime;

    let miliSecond = 1000;
    let secondInHour = 3600;
    let hourInDay = 24;

    let distanceTimeInSecond = Math.floor(distanceTime / miliSecond);
    let distanceTimeInMinute = Math.floor(distanceTime / (miliSecond * 60));
    let distanceTimeInHour = Math.floor(distanceTime / (miliSecond * secondInHour));
    let distanceTimeInDay = Math.floor(distanceTime / (miliSecond * secondInHour * hourInDay));

    if (distanceTimeInDay > 1) {
        return `${distanceTimeInDay} Days ago`
    } else if (distanceTimeInDay === 1) {
        return `${distanceTimeInDay} Day ago`
    } else if (distanceTimeInHour > 1) {
        return `${distanceTimeInHour} Hours ago`
    } else if (distanceTimeInHour === 1) {
        return `${distanceTimeInHour} Hour ago`
    } else if (distanceTimeInMinute > 1) {
        return `${distanceTimeInMinute} Minutes ago`
    } else if (distanceTimeInMinute === 1) {
        return `${distanceTimeInMinute} Minute ago`
    } else if (distanceTimeInSecond > 1) {
        return `${distanceTimeInSecond} Seconds ago`
    } else {
        return `${distanceTimeInSecond} Second ago`
    }
};

app.listen(port, () => {
    console.log(`Server berjalan di port ${port}`);
});