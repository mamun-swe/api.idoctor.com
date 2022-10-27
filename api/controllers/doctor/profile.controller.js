const Doctor = require("../../../models/Doctor");
const Council = require("../../../models/Council");
const Upload = require("../../services/FileUpload");
const Unlink = require("../../services/FileDelete");
const CheckId = require("../../middleware/CheckId");
const hostURL = require("../../utils/url");
const {
  httpSuccessResponse,
  httpErrorResponse,
} = require("../../utils/helper");

const me = async (req, res, next) => {
  try {
    const { id } = req.user;

    // Find account using account id and role
    let account = await Doctor.findById(id, { access_token: 0, password: 0 })
      .populate("councilHour")
      .exec();

    if (account && account.image) {
      account.image = hostURL(req) + "uploads/" + account.image;
    }

    res.status(200).json(
      await httpSuccessResponse({
        status: true,
        message: "Profile information.",
        data: account,
      })
    );
  } catch (error) {
    if (error) {
      console.log(error);
      next(error);
    }
  }
};

// Update Profile
const update = async (req, res, next) => {
  try {
    let filename;
    const { id } = req.user;
    const {
      name,
      college,
      passingYear,
      specialist,
      currentHospital,
      country,
      city,
      currentAddress,
      latitude,
      longitude,
      day,
      startTime,
      endTime,
    } = req.body;

    await CheckId(id);

    // Find Profile
    const availableAccount = await Doctor.findById(id);
    if (!availableAccount) {
      return res.status(404).json(
        await httpErrorResponse({
          status: false,
          errors: {
            message: "Account not found.",
          },
        })
      );
    }

    // Update doctor name & image
    if (req.files) {
      // Remove old file
      if (availableAccount.image) {
        await Unlink.fileDelete(
          "./uploads/doctor/profiles/",
          availableAccount.image
        );
      }

      filename = Upload.fileUpload(
        req.files.image,
        "./uploads/doctor/profiles/"
      );

      const updateData = {
        name: name,
        image: filename,
        updateRange: 40,
        updateStep: 2,
      };

      const updateDoctor = await doctor
        .updateOne({ $set: updateData }, { new: true })
        .exec();

      if (!updateDoctor) {
        return res.status(501).json({
          message: "Update error",
        });
      }

      return res.status(200).json({
        status: true,
        message: "Successfully step one complete.",
      });
    } else if (college && passingYear && specialist && currentHospital) {
      const updateData = {
        college: college,
        passingYear: passingYear,
        specialist: specialist,
        currentHospital: currentHospital,
        updateRange: 60,
        updateStep: 3,
      };

      // Update doctor
      const updateDoctor = await doctor
        .updateOne({ $set: updateData }, { new: true })
        .exec();

      if (!updateDoctor) {
        return res.status(501).json({
          message: "Update error",
        });
      }

      return res.status(200).json({
        status: true,
        message: "Successfully step one complete.",
      });
    } else if (country && city && currentAddress) {
      const updateData = {
        country: country,
        city: city,
        currentAddress: currentAddress,
      };

      // Update address
      const updateDoctor = await doctor
        .updateOne(
          {
            $set: {
              updateRange: 80,
              updateStep: 4,
              "location.address": updateData,
            },
          },
          { new: true }
        )
        .exec();

      if (!updateDoctor) {
        return res.status(501).json({
          message: "Update error",
        });
      }

      return res.status(200).json({
        status: true,
        message: "Successfully step one complete.",
      });
    } else if (latitude && longitude) {
      // Update location
      const updateDoctor = await doctor
        .updateOne(
          {
            $set: {
              updateRange: 90,
              updateStep: 5,
              "location.coordinates": [latitude, longitude],
            },
          },
          { new: true }
        )
        .exec();

      if (!updateDoctor) {
        return res.status(501).json({
          message: "Update error",
        });
      }

      return res.status(200).json({
        status: true,
        message: "Successfully step one complete.",
      });
    } else if (day && startTime && endTime) {
      // Add new council
      const newCouncil = new Council({
        doctor: doctor._id,
        schedule: { day: day, startTime: startTime, endTime: endTime },
      });

      let council = await newCouncil.save();

      // set council into doctor
      const updateDoctor = await doctor
        .updateOne({
          $set: {
            updateRange: 100,
            updateStep: 6,
            isApproved: "submitted",
            councilHour: [council._id],
          },
        })
        .exec();

      if (council && updateDoctor) {
        return res.status(200).json({
          status: true,
          message: "Successfully all steps completed.",
        });
      }
    }
  } catch (error) {
    if (error) next(error);
  }
};

module.exports = {
  me,
  update,
};
