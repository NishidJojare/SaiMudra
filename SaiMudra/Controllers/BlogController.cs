using SaiMudra.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SaiMudra.Controllers
{
    public class BlogController : Controller
    {
        // GET: Blog
        public ActionResult BlogIndex()
        {
            return View();
        }
        public ActionResult SaveBlogIndex()
        {
            return View();
        }

        public ActionResult BlogList()
        {
            return View();
        }

        public ActionResult SaveBlog(BlogModel model)
        {
            try
            {
                HttpPostedFileBase fb = null;
                for (int i = 0; i < Request.Files.Count; i++)
                {
                    fb = Request.Files[i];
                }
                return Json(new { Message = new BlogModel().SaveBlog(fb, model) }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { model = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult GetBlogList(BlogModel model)
        {
            try
            {
                return Json(new { model = (new BlogModel().GetBlogList()) },
                    JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { model = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult deleteBlog(int Id)
        {
            try
            {
                return Json(new { model = (new BlogModel().deleteBlog(Id)) }, JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {
                return Json(new { ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }
        public ActionResult EditBlog(int Id)
        {
            try
            {
                return Json(new { model = (new BlogModel().EditBlog(Id)) }, JsonRequestBehavior.AllowGet);
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
                return Json(new { model = (new BlogModel().GetDetails(Id)) }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

    }
}