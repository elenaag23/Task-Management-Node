const ProjectMembers = require("../models/projectMember");

exports.add = async (req, res) => {
  try {
    //const userId = req.user.userId;
    const { projectId, userId, role } = req.body;

    const projectMember = await ProjectMembers.create({
      projectid: projectId,
      userid: userId,
      role: role,
    });

    res.status(201).json(projectMember);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getMembers = async (req, res) => {
  try {
    const projectId = parseInt(req.params.id, 10);
    const projectMembers = await projectMembers.findAll(projectId);

    const membersArray = [];

    for (var member of projectMembers) {
      const user = User.findByPk(member.memberId);
      membersArray.push(user);
    }

    res.status(200).json(membersArray);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.edit = async (req, res) => {
  const projectId = parseInt(req.params.id, 10);
  const memberId = parseInt(req.params.idMember, 10);
  const { role } = req.body;

  const [updated] = await ProjectMembers.update(
    {
      role: role,
    },
    { where: { projectId: projectId, memberId: memberId } }
  );

  res
    .status(200)
    .json({ message: "Project member updated successfully", project });
};

exports.deleteMember = async (req, res) => {
  const projectId = req.params.id;
  const memberId = req.params.memberId;

  try {
    const member = await ProjectMembers.findOne({
      where: {
        projectId: projectId,
        memberId: userId,
      },
    });
    if (!member) {
      return res.status(404).json({ error: "Member not found" });
    }

    await ProjectMembers.destroy({
      where: { id: projectId, memberId: memberId },
    });

    res.status(200).json({ message: "Project member deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the project member" });
  }
};
