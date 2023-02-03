import prisma from "/lib/prisma";

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      /* GET ALL */
      const doc_authors = await prisma.usersOnResearchGroup.findMany({
        where: {
          researchGroup: { name: "FLORA" },
        },
        select: {
          user: {
            select: {
              id: false,
              username: true,
              fullname: true,
            },
          },
        },
      });
      const result = doc_authors.map((doc) => ({
        username: doc.user.username,
        fullname: doc.user.fullname,
      }));
      res.status(200).json({
        body: JSON.stringify(result),
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      code: err?.code,
    });
  }
}
