import { Router } from "express";
import { users } from "../../mockData/fakeUsers.js";

export const router = Router();

// controller function

router.get("/", (req, res) => {
  res.json(users); // json ของ obj ที่ชื่อว่า rest
});

router.post("/", (req, res) => {
  const { username, email } = req.body || {};

  if (!username || !email) {
    return res.json({ error: "username and email are requires" });
  }

  //simple incremental string id absed on current mock data
  // ไปทำความเข้ใจว่าโค้ดไลน์นี้ work ยังไง
  const nextId = String(
    (users.reduce((max, u) => Math.max(max, Number(u.id)), 0) || 0) + 1,
  );

  // ปั้น obj เก็บข้อมูล  new User โดยให้มี key 3 ตัวนี้ เป็นการเขียนแบบ​ short hand เมืิ่อ key: ค่าชื่อเดียวกัน
  const newUser = { id: nextId, username, email };

  // เอาเข้าไปเก็บ database query ส้งข้อมูลกลับไปเก็บใน mongoDB
  users.push(newUser);
  return res.status(201).json(newUser);
});

router.put("/:id", (req, res) => {
  const user = users.find((u) => u.id === req.params.id);

  if (!user) {
    return res.status(404).json({ error: "User not found." });
  }
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ error: "username, email and password are required." });
  }

  user.username = username;
  user.email = email;
  user.password = password;

  // เพื่อตอบกลับว่าอัปเดตสำเร็จแล้ว
  return res.status(200).json(user);
});

// app.delete();
