using SaiMudra.Data;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace SaiMudra.Models
{
    public class BlogModel
    {

        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Photo { get; set; }
        public Nullable<bool> IsActive { get; set; }
        public string CreateDate { get; set; }

        public string SaveBlog(HttpPostedFileBase fb, BlogModel model)
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
                    var SaveUser = new tblBlog()
                    {
                        
                        Title=model.Title,
                        Description = model.Description,
                        Photo = sysFileName,
                        IsActive = model.IsActive,
                        CreateDate = DateTime.Now,
                    };
                    db.tblBlogs.Add(SaveUser);
                    db.SaveChanges();
                    return msg;
                }
                else
                {
                    var aboutData = db.tblBlogs.Where(P => P.Id == model.Id).FirstOrDefault();
                    if (aboutData != null)
                    {
                        aboutData.Title= model.Title;
                        aboutData.Description = model.Description;
                        aboutData.Photo = sysFileName;
                        aboutData.IsActive = model.IsActive;
                        aboutData.CreateDate = DateTime.Now;
                    };
                    db.SaveChanges();
                    msg = "Update Successfully";
                }
            }
            return msg;

        }

        public List<BlogModel> GetBlogList()
        {
            SaiMudraEntities Db = new SaiMudraEntities();
            List<BlogModel> lstSalary = new List<BlogModel>();
            var SalaryList = Db.tblBlogs.ToList();
            if (SalaryList != null)
            {
                foreach (var Salary in SalaryList)
                {
                    lstSalary.Add(new BlogModel()
                    {
                        Id = Salary.Id,
                        Title=Salary.Title,
                        Description = Salary.Description,
                        Photo = Salary.Photo,
                        IsActive = Salary.IsActive,
                        CreateDate = Salary.CreateDate.ToString(),
                    });
                }
            }
            return lstSalary;
        }

        public string deleteBlog(int Id)
        {
            string msg = "";
            SaiMudraEntities Db = new SaiMudraEntities();
            var deleteRegistration = Db.tblBlogs.Where(p => p.Id == Id).FirstOrDefault();
            if (deleteRegistration != null)
            {
                Db.tblBlogs.Remove(deleteRegistration);
            };
            Db.SaveChanges();
            msg = "Record Delete";
            return msg;
        }

        public BlogModel EditBlog(int Id)
        {
            string msg = "";
            BlogModel model = new BlogModel();
            SaiMudraEntities Db = new SaiMudraEntities();
            var RegData = Db.tblBlogs.Where(p => p.Id == Id).FirstOrDefault();
            if (RegData != null)
            {
                model.Id = RegData.Id;
                model.Title = RegData.Title;
                model.Description = RegData.Description;
                model.Photo = RegData.Photo;
                model.IsActive = RegData.IsActive;
                model.CreateDate = RegData.CreateDate.ToString();

            };
            return model;
        }
        public BlogModel GetDetails(int Id)
        {
            string msg = "";
            BlogModel model = new BlogModel();
            SaiMudraEntities Db = new SaiMudraEntities();
            var RegData = Db.tblBlogs.Where(p => p.Id == Id).FirstOrDefault();
            if (RegData != null)
            {
                model.Id = RegData.Id;
                model.Title = RegData.Title;
                model.Description = RegData.Description;
                model.Photo = RegData.Photo;
                model.IsActive = RegData.IsActive;
                model.CreateDate = RegData.CreateDate.ToString();

            };
            return model;
        }


    }
}