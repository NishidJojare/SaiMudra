using SaiMudra.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SaiMudra.Controllers
{
    public class ContactController : Controller
    {
        // GET: Contact
        public ActionResult SaveContact()
        {
            return View();
        }

        public ActionResult ContactList()
        {
            return View();
        }

        public ActionResult Contactsave(ContactModel model)
        {
            try
            {
                return Json(new { Message = new ContactModel().Contactsave( model) }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { model = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult GetContactList(ContactModel model)
        {
            try
            {
                return Json(new { model = (new ContactModel().GetContactList()) },
                    JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { model = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult deleteContact(int Id)
        {
            try
            {
                return Json(new { model = (new ContactModel().deleteContact(Id)) }, JsonRequestBehavior.AllowGet);

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
                return Json(new { model = (new ContactModel().GetDetails(Id)) }, JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {
                return Json(new { ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }


    }
}