const express = require("express");
const mariadb = require("mariadb");
const bodyParser = require("body-parser");


////////////////////////////////////////////////
//////  Database 
var config = require('./config.json');
const pool = mariadb.createPool({
	host: config.host,
	user: config.user,
	password: config.password,
	database: config.database,
	connectionLimit: config.connectionLimit
});


async function dbGetSLO() {
	let conn;
	let rows;
	try {
		conn = await pool.getConnection();
		rows = await conn.query("SELECT * FROM slo");
	} catch (err) {
		throw err;
	} finally {
		if (conn) conn.end();
		return rows;
	}
}

async function dbGetRule() {
	let conn;
	let rows;
	try {
		conn = await pool.getConnection();
		rows = await conn.query("SELECT * FROM rule");
	} catch (err) {
		throw err;
	} finally {
		if (conn) conn.end();
		return rows;
	}
}

async function dbGetPeriod() {
	let conn;
	let rows;
	try {
		conn = await pool.getConnection();
		rows = await conn.query("SELECT * FROM sloperiod");
	} catch (err) {
		throw err;
	} finally {
		if (conn) conn.end();
		return rows;
	}
}

async function dbDeleteSLO(sloid) {
	let conn;
	let res;
	try {
		conn = await pool.getConnection();
		console.log("res")
		res = await conn.query("DELETE FROM slo WHERE sloid = '" + sloid + "'");
		console.log(res)
	} catch (err) {
		throw err;
	} finally {
		if (conn) conn.end();
		return res;
	}
}

async function dbDeleteRule(sloid) {
	let conn;
	let res;
	try {
		conn = await pool.getConnection();
		res = await conn.query("DELETE FROM rule WHERE sloid = '" + sloid + "'");
		console.log(res)
	} catch (err) {
		throw err;
	} finally {
		if (conn) conn.end();
		return res;
	}
}

async function dbDeletePeriod(sloid, period) {
	let conn;
	let res;
	try {
		conn = await pool.getConnection();
		res = await conn.query("DELETE FROM sloperiod WHERE sloid = '" + sloid + "' AND period = '" + period + "'");
		console.log(res)
	} catch (err) {
		throw err;
	} finally {
		if (conn) conn.end();
		return res;
	}
}

async function dbSetSLO(sloid, name, unit) {
	let conn;
	let res;
	try {
		conn = await pool.getConnection();
		console.log("res")
		res = await conn.query("INSERT INTO slo value (?,?,?)", [sloid, name, unit]);
		console.log(res)
	} catch (err) {
		throw err;
	} finally {
		if (conn) conn.end();
		return res;
	}
}

async function dbSetRule(sloid, ft, ct) {
	let conn;
	let res;
	try {
		conn = await pool.getConnection();
		res = await conn.query("INSERT INTO rule value (?,?,?,?)", [sloid, ft, ct, 1]);
		console.log(res)
	} catch (err) {
		throw err;
	} finally {
		if (conn) conn.end();
		return res;
	}
}

async function dbSetPeriod(sloid, period, value, operator, budget) {
	let conn;
	let res;
	try {
		conn = await pool.getConnection();
		res = await conn.query("INSERT INTO sloperiod value (?,?,?,?,?)", [sloid, period, value, operator, budget]);
		console.log(res)
	} catch (err) {
		throw err;
	} finally {
		if (conn) conn.end();
		return res;
	}
}

////////////////////////////////////////////////
//////  API 

const app = express();
app.use(bodyParser.json());

app.get("/api", (req, res) => {
	res.json({
		slo_gui: ["api_test", "for", "slo_gui"]
	});
});

app.get("/getSLO", async (req, res) => {
	const dbget = await dbGetSLO();
	const js = JSON.parse(JSON.stringify(dbget));
	res.json(js);
});

app.post("/deleteSLO", (req, res) => {
	let data = req.body;
	console.log("Deleting SLO " + req.body.sloid);
	dbDeleteSLO(req.body.sloid);

	res.send("Data Received: " + JSON.stringify(data));
});

app.post("/addSLO", (req, res) => {
	let data = req.body;
	console.log("Adding SLO " + req.body.sloid + req.body.name + req.body.unit);
	dbSetSLO(req.body.sloid, req.body.name, req.body.unit);
	res.send("Data Received: " + JSON.stringify(data));
});

app.get("/getRule", async (req, res) => {
	const dbget = await dbGetRule();
	const js = JSON.parse(JSON.stringify(dbget));
	res.json(js);
});

app.post("/deleteRule", (req, res) => {
	let data = req.body;
	console.log("Deleting Rule " + req.body.sloid);
	dbDeleteRule(req.body.sloid);
	res.send("Data Received: " + JSON.stringify(data));
});

app.post("/addRule", (req, res) => {
	let data = req.body;
	console.log("Adding Rule " + req.body.sloid + req.body.ft + req.body.ct);
	dbSetRule(req.body.sloid, req.body.ft, req.body.ct);
	res.send("Data Received: " + JSON.stringify(data));
});

app.get("/getPeriod", async (req, res) => {
	const dbget = await dbGetPeriod();
	const js = JSON.parse(JSON.stringify(dbget));
	res.json(js);
});

app.post("/deletePeriod", (req, res) => {
	let data = req.body;
	console.log("Deleting Period " + req.body.sloid + req.body.period);
	dbDeletePeriod(req.body.sloid, req.body.period);
	res.send("Data Received: " + JSON.stringify(data));
});

app.post("/addPeriod", (req, res) => {
	let data = req.body;
	console.log(
		"Adding Period " +
		req.body.sloid +
		req.body.period +
		req.body.value +
		req.body.operator +
		req.body.budget
	);
	dbSetPeriod(req.body.sloid, req.body.period, req.body.value, req.body.operator, req.body.budget)
	res.send("Data Received: " + JSON.stringify(data));
});


app.listen(config.client_port, () => {
	console.log("Server startet on port " + config.client_port);
});