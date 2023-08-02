using SaiMudra.Data;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace SaiMudra.Models
{
    public class AboutUsModel
    {
        public int Id { get; set; }
        public string Photo { get; set; }
        public string Descripition { get; set; }
        public Nullable<bool> IsActive { get; set; }
        public string CreateDate { get; set; }

        public string SaveAboutus(HttpPostedFileBase fb,AboutUsModel model)
        {
            string msg = "";
            SaiMudraEntities db = new SaiMudraEntities();
            string filepath = "";
            string fileName = "";
            string sysFileName = "";
            if (fb != null && fb.ContentLength > 0)
            {
                filepath = HttpContext.Current.Server.MapPath("~/Content/Img/");
                DirectoryInfo di = new DirectoryInfo(filepath);
                if (!di.Exists)
                {
                    di.Create();
                }
                fileName = fb.FileName;
                sysFileName = DateTime.Now.ToFileTime().ToString() + Path.GetExtension(fb.FileName);
                fb.SaveAs(filepath + "//" + sysFileName);
                if (!string.IsNullOrWhiteSpace(fb.FileName))
                {
                    string afileName = HttpContext.Current.Server.MapPath("~/Content/Img/") + "/" + sysFileName;
                }
            }
            {
                if (model.Id == 0)

                {
                    var SaveUser = new tblAbout()
                    {
                        Photo = sysFileName,
                        Descripition = model.Descripition,
                        IsActive = model.IsActive,
                        CreateDate = DateTime.Now,
                    };
                    db.tblAbouts.Add(SaveUser);
                    db.SaveChanges();
                    return msg;
                }
                else
                {
                    var aboutData = db.tblAbouts.Where(P => P.Id == model.Id).FirstOrDefault();
                    if (aboutData != null)
                    {
                        aboutData.Photo = sysFileName;
                        aboutData.Descripition = model.Descripition;
                        aboutData.IsActive = model.IsActive;
                        aboutData.CreateDate = DateTime.Now;
                    };
                    db.SaveChanges();
                    msg = "Update Successfully";
                }
            }
            return msg;

        }
        public List<AboutUsModel> GetAboutList()
        {
            SaiMudraEntities Db = new SaiMudraEntities();
            List<AboutUsModel> lstSalary = new List<AboutUsModel>();
            var SalaryList = Db.tblAbouts.ToList();
            if (SalaryList != null)
            {
                foreach (var Salary in SalaryList)
                {
                    lstSalary.Add(new AboutUsModel()
                    {
                        Id = Salary.Id,
                        Photo = Salary.Photo,
                        Descripition = Salary.Descripition,
                        IsActive = Salary.IsActive,
                        CreateDate = Salary.CreateDate.ToString(),
                    });
                }
            }
            return lstSalary;
        }

        public string deleteAboutus(int Id)
        {
            string msg = "";
            SaiMudraEntities Db = new SaiMudraEntities();
            var deleteRegistration = Db.tblAbouts.Where(p => p.Id ==Id).FirstOrDefault();
            if (deleteRegistration != null)
            {
                Db.tblAbouts.Remove(deleteRegistration);
            };
            Db.SaveChanges();
            msg = "Record Delete";
            return msg;
        }

        public AboutUsModel EditAboutus(int Id)
        {
            string msg = "";
            AboutUsModel model = new AboutUsModel();
            SaiMudraEntities Db = new SaiMudraEntities();
            var RegData = Db.tblAbouts.Where(p => p.Id == Id).FirstOrDefault();
            if (RegData != null)
            {
                model.Id = RegData.Id;
                model.Photo=RegData.Photo;
                model.Descripition = RegData.Descripition;
                model.IsActive = RegData.IsActive;
                model.CreateDate = RegData.CreateDate.ToString();
                
            };
            return model;
        }

        public AboutUsModel GetDetails(int Id)
        {
            string msg = "";
            AboutUsModel model = new AboutUsModel();
            SaiMudraEntities Db = new SaiMudraEntities();
            var AboutData = Db.tblAbouts.Where(p => p.Id == Id).FirstOrDefault();
            if (AboutData != null)
            {
                model.Id = AboutData.Id;
                model.Photo = AboutData.Photo;
                model.Descripition = AboutData.Descripition;
                model.IsActive = AboutData.IsActive;
                model.CreateDate = AboutData.CreateDate.ToString();


            };
            return model;
        }

    }
}