using SaiMudra.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SaiMudra.Controllers
{
    public class KattarController : Controller
    {
        // GET: Kattar
        public ActionResult KatarVadakIndex()
        {
            return View();
        }
        public ActionResult  SaveKatarVadakIndex()
        {
            return View();
        }

        public ActionResult KatarVadakList()
        {
            return View();
        }

        public ActionResult SaveKatterVadak(KatterVadakModel model)
        {
            try
            {
                HttpPostedFileBase fb = null;
                for (int i = 0; i < Request.Files.Count; i++)
                {
                    fb = Request.Files[i];
                }
                return Json(new { Message = new KatterVadakModel().SaveKatterVadak(fb, model) }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { model = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult GetKatterVadakList(KatterVadakModel model)
        {
            try
            {
                return Json(new { model = (new KatterVadakModel().GetKatterVadakList()) },
                    JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { model = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }
        public ActionResult deleteKattervadak(int Id)
        {
            try
            {
                return Json(new { model = (new KatterVadakModel().deleteKattervadak(Id)) }, JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {
                return Json(new { ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }
        public ActionResult EditKatterVadak(int Id)
        {
            try
            {
                return Json(new { model = (new KatterVadakModel().EditKatterVadak(Id)) }, JsonRequestBehavior.AllowGet);
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
                return Json(new { model = (new KatterVadakModel().GetDetails(Id)) }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

    }
}