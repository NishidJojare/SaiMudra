using SaiMudra.Data;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace SaiMudra.Models
{
    public class GalleryModel
    {
        public int Id { get; set; }
        public string Photo { get; set; }
        public string Video { get; set; }
        public Nullable<bool> IsActive { get; set; }
        public String CreateDate { get; set; }

        public string SaveGallery(HttpPostedFileBase fb, GalleryModel model)
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
                    var SaveUser = new tblGallary()
                    {
                        Photo = sysFileName,
                        Video = model.Video,
                        IsActive = model.IsActive,
                        CreateDate = DateTime.Now,
                    };
                    db.tblGallaries.Add(SaveUser);
                    db.SaveChanges();
                    return msg;
                }
                else
                {
                    var aboutData = db.tblGallaries.Where(P => P.Id == model.Id).FirstOrDefault();
                    if (aboutData != null)
                    {
                        aboutData.Photo = sysFileName;
                        aboutData.Video = model.Video;
                        aboutData.IsActive = model.IsActive;
                        aboutData.CreateDate = DateTime.Now;
                    };
                    db.SaveChanges();
                    msg = "Update Successfully";
                }
            }
            return msg;

        }
        public List<GalleryModel> GetGalleryList()
        {
            SaiMudraEntities Db = new SaiMudraEntities();
            List<GalleryModel> lstSalary = new List<GalleryModel>();
            var SalaryList = Db.tblGallaries.ToList();
            if (SalaryList != null)
            {
                foreach (var Salary in SalaryList)
                {
                    lstSalary.Add(new GalleryModel()
                    {
                        Id = Salary.Id,
                        Photo = Salary.Photo,
                        Video = Salary.Video,
                        IsActive = Salary.IsActive,
                        CreateDate = Salary.CreateDate.ToString(),
                    });
                }
            }
            return lstSalary;
        }
        public string deleteGallery(int Id)
        {
            string msg = "";
            SaiMudraEntities Db = new SaiMudraEntities();
            var deleteRegistration = Db.tblGallaries.Where(p => p.Id == Id).FirstOrDefault();
            if (deleteRegistration != null)
            {
                Db.tblGallaries.Remove(deleteRegistration);
            };
            Db.SaveChanges();
            msg = "Record Delete";
            return msg;
        }
        public GalleryModel EditGallery(int Id)
        {
            string msg = "";
            GalleryModel model = new GalleryModel();
            SaiMudraEntities Db = new SaiMudraEntities();
            var RegData = Db.tblGallaries.Where(p => p.Id == Id).FirstOrDefault();
            if (RegData != null)
            {
                model.Id = RegData.Id;
                model.Photo = RegData.Photo;
                model.Video = RegData.Video;
                model.IsActive = RegData.IsActive;
                model.CreateDate = RegData.CreateDate.ToString();

            };
            return model;
        }
        public GalleryModel GetDetails(int Id)
        {
            string msg = "";
            GalleryModel model = new GalleryModel();
            SaiMudraEntities Db = new SaiMudraEntities();
            var RegData = Db.tblGallaries.Where(p => p.Id == Id).FirstOrDefault();
            if (RegData != null)
            {
                model.Id = RegData.Id;
                model.Photo = RegData.Photo;
                model.Video = RegData.Video;
                model.IsActive = RegData.IsActive;
                model.CreateDate = RegData.CreateDate.ToString();

            };
            return model;
        }

    }
}