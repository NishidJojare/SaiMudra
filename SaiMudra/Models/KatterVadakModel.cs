using SaiMudra.Data;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace SaiMudra.Models
{
    public class KatterVadakModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Photo { get; set; }
        public string Instragram { get; set; }
        public string Facebook { get; set; }
        public Nullable<bool> IsActive { get; set; }
        public string CreateDate { get; set; }

        public string SaveKatterVadak(HttpPostedFileBase fb, KatterVadakModel model)
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
                    var SaveUser = new tblKattarVadak()
                    {
                        Name=model.Name,
                        Photo = sysFileName,
                        Instragram = model.Instragram,
                        Facebook=model.Facebook,
                        IsActive = model.IsActive,
                        CreateDate = DateTime.Now,
                    };
                    db.tblKattarVadaks.Add(SaveUser);
                    db.SaveChanges();
                    return msg;
                }
                else
                {
                    var aboutData = db.tblKattarVadaks.Where(P => P.Id == model.Id).FirstOrDefault();
                    if (aboutData != null)
                    {
                        aboutData.Name = model.Name;
                        aboutData.Photo = sysFileName;
                        aboutData.Instragram = model.Instragram;
                        aboutData.Facebook = model.Facebook;
                        aboutData.IsActive = model.IsActive;
                        aboutData.CreateDate = DateTime.Now;
                    };
                    db.SaveChanges();
                    msg = "Update Successfully";
                }
            }
            return msg;

        }
        public List<KatterVadakModel> GetKatterVadakList()
        {
            SaiMudraEntities Db = new SaiMudraEntities();
            List<KatterVadakModel> lstSalary = new List<KatterVadakModel>();
            var SalaryList = Db.tblKattarVadaks.ToList();
            if (SalaryList != null)
            {
                foreach (var Salary in SalaryList)
                {
                    lstSalary.Add(new KatterVadakModel()
                    {
                        Id = Salary.Id,
                        Name=Salary.Name,
                        Photo = Salary.Photo,
                        Instragram = Salary.Instragram,
                        Facebook=Salary.Facebook,
                        IsActive = Salary.IsActive,
                        CreateDate = Salary.CreateDate.ToString(),
                    });
                }
            }
            return lstSalary;
        }

        public string deleteKattervadak(int Id)
        {
            string msg = "";
            SaiMudraEntities Db = new SaiMudraEntities();
            var deleteRegistration = Db.tblKattarVadaks.Where(p => p.Id == Id).FirstOrDefault();
            if (deleteRegistration != null)
            {
                Db.tblKattarVadaks.Remove(deleteRegistration);
            };
            Db.SaveChanges();
            msg = "Record Delete";
            return msg;
        }

        public KatterVadakModel EditKatterVadak(int Id)
        {
            string msg = "";
            KatterVadakModel model = new KatterVadakModel();
            SaiMudraEntities Db = new SaiMudraEntities();
            var RegData = Db.tblKattarVadaks.Where(p => p.Id == Id).FirstOrDefault();
            if (RegData != null)
            {
                model.Id = RegData.Id;
                model.Name = RegData.Name;
                model.Photo = RegData.Photo;
                model.Instragram = RegData.Instragram;
                model.Facebook = RegData.Facebook;
                model.IsActive = RegData.IsActive;
                model.CreateDate = RegData.CreateDate.ToString();

            };
            return model;
        }
        public KatterVadakModel GetDetails(int Id)
        {
            string msg = "";
            KatterVadakModel model = new KatterVadakModel();
            SaiMudraEntities Db = new SaiMudraEntities();
            var RegData = Db.tblKattarVadaks.Where(p => p.Id == Id).FirstOrDefault();
            if (RegData != null)
            {
                model.Id = RegData.Id;
                model.Name = RegData.Name;
                model.Photo = RegData.Photo;
                model.Instragram = RegData.Instragram;
                model.Facebook = RegData.Facebook;
                model.IsActive = RegData.IsActive;
                model.CreateDate = RegData.CreateDate.ToString();

            };
            return model;
        }

    }
}