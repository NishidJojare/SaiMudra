using SaiMudra.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SaiMudra.Controllers
{
    public class RegistrationController : Controller
    {
        // GET: Registration
        public ActionResult RegistrationIndex()
        {
            return View();
        }

        public ActionResult RegistrationList()
        {
            return View();
        }


        public ActionResult SaveRegistration(RegistrationModel model)
        {
            try
            {
                HttpPostedFileBase fb = null;
                for (int i = 0; i < Request.Files.Count; i++)
                {
                    fb = Request.Files[i];
                }
                return Json(new { model = (new RegistrationModel().SaveRegistration(fb,model)) }, JsonRequestBehavior.AllowGet);
            }
            catch(Exception ex)
            {
                return Json(new { model = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult GetregList(RegistrationModel model)
        {
            try
            {
                return Json(new { model = (new RegistrationModel().GetregList()) }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { model = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult deleteRegistration(int Id)
        {
            try
            {
                return Json(new { model = (new RegistrationModel().deleteRegistration(Id)) }, JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {
                return Json(new { ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }
        public ActionResult EditRegistration(int Id)
        {
            try
            {
                return Json(new { model = (new RegistrationModel().EditRegistration(Id)) }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }
        public ActionResult GetDetails(int Id)
        {
            try
            {
                return Json(new { model = (new RegistrationModel().GetDetails(Id)) }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }



    }
}