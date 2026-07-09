import { prisma } from "../../../lib/prisma";

export default async function handler(req, res) {
  // GET All Notices
  if (req.method === "GET") {
    try {
      const notices = await prisma.notice.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });

      return res.status(200).json(notices);
    } catch (error) {
      return res.status(500).json({
        message: "Failed to fetch notices",
      });
    }
  }

  // POST Create Notice
  if (req.method === "POST") {
    try {
      const {
        title,
        body,
        category,
        priority,
        publishDate,
        image,
      } = req.body;

      if (
        !title ||
        !body ||
        !category ||
        !priority ||
        !publishDate
      ) {
        return res.status(400).json({
          message: "All required fields are mandatory",
        });
      }

      const notice = await prisma.notice.create({
        data: {
          title,
          body,
          category,
          priority,
          publishDate: new Date(publishDate),
          image,
        },
      });

      return res.status(201).json(notice);
    } catch (error) {
      console.log(error);

      return res.status(500).json({
        message: "Failed to create notice",
      });
    }
  }

  return res.status(405).json({
    message: "Method Not Allowed",
  });
}