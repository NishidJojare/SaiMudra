using SaiMudra.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SaiMudra.Controllers
{
    public class GalleryController : Controller
    {
        // GET: Gallery
        public ActionResult GalleryIndex()
        {
            return View();
        }
        public ActionResult GallerySaveIndex()
        {
            return View();
        }

        public ActionResult GalleryList()
        {
            return View();
        }

        public ActionResult SaveGallery(GalleryModel model)
        {
            try
            {
                HttpPostedFileBase fb = null;
                for (int i = 0; i < Request.Files.Count; i++)
                {
                    fb = Request.Files[i];
                }
                return Json(new { Message = new GalleryModel().SaveGallery(fb, model) }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { model = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult GetGalleryList(GalleryModel model)
        {
            try
            {
                return Json(new { model = (new GalleryModel().GetGalleryList()) },
                    JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { model = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }
        public ActionResult deleteGallery(int Id)
        {
            try
            {
                return Json(new { model = (new GalleryModel().deleteGallery(Id)) }, JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {
                return Json(new { ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }
        public ActionResult EditGallery(int Id)
        {
            try
            {
                return Json(new { model = (new GalleryModel().EditGallery(Id)) }, JsonRequestBehavior.AllowGet);
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
                return Json(new { model = (new GalleryModel().GetDetails(Id)) }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }


    }
}