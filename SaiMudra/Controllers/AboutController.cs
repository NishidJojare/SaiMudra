using SaiMudra.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SaiMudra.Controllers
{
    public class AboutController : Controller
    {
        // GET: About
        public ActionResult AboutIndex()
        {
            return View();
        }

        public ActionResult About_AdminIndex()
        {
            return View();
        }

        public ActionResult About_AdminList()
        {
            return View();
        }

        public ActionResult SaveAboutus(AboutUsModel model)
        {
            try
            {
                HttpPostedFileBase fb = null;
                for (int i = 0; i < Request.Files.Count; i++)
                {
                    fb = Request.Files[i];
                }
                return Json(new { Message = new AboutUsModel().SaveAboutus(fb, model) }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { model = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult GetAboutList(AboutUsModel model)
        {
            try
            {
                return Json(new { model = (new AboutUsModel().GetAboutList()) },
                    JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { model = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult deleteAboutus(int Id)
        {
            try
            {
                return Json(new { model = (new AboutUsModel().deleteAboutus(Id)) }, JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {
                return Json(new { ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult EditAboutus(int Id)
        {
            try
            {
                return Json(new { model = (new AboutUsModel().EditAboutus(Id)) }, JsonRequestBehavior.AllowGet);
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
                return Json(new { model = (new AboutUsModel().GetDetails(Id)) }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }
    }
}