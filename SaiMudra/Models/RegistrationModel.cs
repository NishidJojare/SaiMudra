using SaiMudra.Data;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace SaiMudra.Models
{
    public class RegistrationModel
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        public string Mobile { get; set; }
        public string Email { get; set; }
        public string Age { get; set; }
        public System.DateTime DOB { get; set; }
        public string BloodGroup { get; set; }
        public string Aadhar { get; set; }
        public string Gender { get; set; }
        public string Address { get; set; }
        public string Occupation { get; set; }
        public Nullable<bool> IsActive { get; set; }
        public string CreateDate { get; set; }
        public string Photo { get; set; }

        public string SaveRegistration(HttpPostedFileBase fb, RegistrationModel model)
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

            if (model.Id == 0)
            {
                var SaveUser = new tblRegistration()
                {

                    Id = model.Id,
                    FullName = model.FullName,
                    Mobile = model.Mobile,
                    Email = model.Email,
                    Age = model.Age,
                    DOB = Convert.ToDateTime(model.DOB),
                    BloodGroup = model.BloodGroup,
                    Aadhar = model.Aadhar,
                    Gender = model.Gender,
                    Address = model.Address,
                    Occupation = model.Occupation,
                    IsActive = model.IsActive,
                    CreateDate = DateTime.Now,
                    Photo = sysFileName,
                };
                db.tblRegistrations.Add(SaveUser);
                db.SaveChanges();
                return msg;
            }
            else
            {
                var aboutdata = db.tblRegistrations.Where(p => p.Id == model.Id).FirstOrDefault();

                if (aboutdata != null)
                {

                    aboutdata.Id = model.Id;
                    aboutdata.FullName = model.FullName;
                    aboutdata.Mobile = model.Mobile;
                    aboutdata.Email = model.Email;
                    aboutdata.Age = model.Age;
                    aboutdata.DOB = Convert.ToDateTime(model.DOB);
                    aboutdata.BloodGroup = model.BloodGroup;
                    aboutdata.Aadhar = model.Aadhar;
                    aboutdata.Gender = model.Gender;
                    aboutdata.Address = model.Address;
                    aboutdata.Occupation = model.Occupation;
                    aboutdata.IsActive = model.IsActive;
                    aboutdata.CreateDate = DateTime.Now;
                    aboutdata.Photo = sysFileName;
                };
                db.SaveChanges();
                msg = "update successfully";

            }
            return msg;

        }
        public List<RegistrationModel> GetregList()
        {
            SaiMudraEntities Db = new SaiMudraEntities();
            List<RegistrationModel> lstSalary = new List<RegistrationModel>();
            var SalaryList = Db.tblRegistrations.ToList();
            if (SalaryList != null)
            {
                foreach (var Salary in SalaryList)
                {
                    lstSalary.Add(new RegistrationModel()
                    {
                        Id = Salary.Id,
                        FullName = Salary.FullName,
                        Mobile = Salary.Mobile,
                        Email = Salary.Email,
                        Age = Salary.Age,
                        DOB = Salary.DOB,
                        BloodGroup = Salary.BloodGroup,
                        Aadhar = Salary.Aadhar,
                        Gender = Salary.Gender,
                        Address = Salary.Address,
                        Occupation = Salary.Occupation,
                        IsActive = Salary.IsActive,
                        CreateDate = DateTime.Now.ToString(),
                        Photo = Salary.Photo,
                    });
                }
            }
            return lstSalary;
        }

        public string deleteRegistration(int Id)
        {
            string msg = "";
            SaiMudraEntities Db = new SaiMudraEntities();
            var deleteRegistration = Db.tblRegistrations.Where(p => p.Id == Id).FirstOrDefault();
            if (deleteRegistration != null)
            {
                Db.tblRegistrations.Remove(deleteRegistration);
            };
            Db.SaveChanges();
            msg = "Record Delete";
            return msg;
        }

        public RegistrationModel EditRegistration(int Id)
        {
            string msg = "";
            RegistrationModel model = new RegistrationModel();
            SaiMudraEntities Db = new SaiMudraEntities();
            var RegData = Db.tblRegistrations.Where(p => p.Id == Id).FirstOrDefault();
            if (RegData != null)
            {
                model.Id = RegData.Id;
                model.FullName = RegData.FullName;
                model.Mobile = RegData.Mobile;
                model.Email = RegData.Email;
                model.Age = RegData.Age;
                model.DOB = RegData.DOB;
                model.BloodGroup = RegData.BloodGroup;
                model.Aadhar = RegData.Aadhar;
                model.Gender = RegData.Gender;
                model.Address = RegData.Address;
                model.Occupation = RegData.Occupation;
                model.IsActive = RegData.IsActive;
                model.CreateDate = DateTime.Now.ToString();
                model.Photo = RegData.Photo;

            };
            return model;
        }
        public RegistrationModel GetDetails(int Id)
        {
            string msg = "";
            RegistrationModel model = new RegistrationModel();
            SaiMudraEntities Db = new SaiMudraEntities();
            var RegData = Db.tblRegistrations.Where(p => p.Id == Id).FirstOrDefault();
            if (RegData != null)
            {
                model.Id = RegData.Id;
                model.FullName = RegData.FullName;
                model.Mobile = RegData.Mobile;
                model.Email = RegData.Email;
                model.Age = RegData.Age;
                model.DOB = RegData.DOB;
                model.BloodGroup = RegData.BloodGroup;
                model.Aadhar = RegData.Aadhar;
                model.Gender = RegData.Gender;
                model.Address = RegData.Address;
                model.Occupation = RegData.Occupation;
                model.IsActive = RegData.IsActive;
                model.CreateDate = DateTime.Now.ToString();
                model.Photo = RegData.Photo;

            };
            return model;
        }


    }
}