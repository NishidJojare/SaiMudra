using SaiMudra.Data;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace SaiMudra.Models
{
    public class ContactModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Mobile { get; set; }
        public string Message { get; set; }
        public Nullable<bool> IsActive { get; set; }
        public String CreateDate { get; set; }

        public string Contactsave(ContactModel model)
        {
            string msg = "";
            SaiMudraEntities Db = new SaiMudraEntities();
            {
                if (model.Id == 0)
                {
                    var regData = new tblContact()
                    {
                        Name = model.Name,
                        Email = model.Email,
                        Mobile = model.Mobile,
                        Message = model.Message,
                        IsActive = model.IsActive,
                        CreateDate = DateTime.Now,
                    };
                    Db.tblContacts.Add(regData);
                    Db.SaveChanges();
                    msg = "Data Saved";
                }
                else
                {
                    var regData = Db.tblContacts.Where(p => p.Id == model.Id).FirstOrDefault();
                    if (regData != null)
                    {
                        //regData.Id= model.Id;
                        regData.Name = model.Name;
                        regData.Email = model.Email;
                        regData.Mobile = model.Mobile;
                        regData.Message = model.Message;
                        regData.IsActive = model.IsActive;
                        regData.CreateDate = DateTime.Now;
                    };
                    Db.SaveChanges();
                    msg = "update Successfully";
                }
            }
            return msg;
        }

        public List<ContactModel> GetContactList()
        {
            SaiMudraEntities Db = new SaiMudraEntities();
            List<ContactModel> lstSalary = new List<ContactModel>();
            var SalaryList = Db.tblContacts.ToList();
            if (SalaryList != null)
            {
                foreach (var Salary in SalaryList)
                {
                    lstSalary.Add(new ContactModel()
                    {
                        Id = Salary.Id,
                        Name = Salary.Name,
                        Email = Salary.Email,
                        Mobile = Salary.Mobile,
                        Message= Salary.Message,
                        IsActive = Salary.IsActive,
                        CreateDate = Salary.CreateDate.ToString(),
                    });
                }
            }
            return lstSalary;
        }

        public string deleteContact(int Id)
        {
            string msg = "";
            SaiMudraEntities Db = new SaiMudraEntities();
            var deleteRegistration = Db.tblContacts.Where(p => p.Id == Id).FirstOrDefault();
            if (deleteRegistration != null)
            {
                Db.tblContacts.Remove(deleteRegistration);
            };
            Db.SaveChanges();
            msg = "Record Delete";
            return msg;
        }

        public ContactModel EditContact(int Id)
        {
            string msg = "";
            ContactModel model = new ContactModel();
            SaiMudraEntities Db = new SaiMudraEntities();
            var RegData = Db.tblContacts.Where(p => p.Id == Id).FirstOrDefault();
            if (RegData != null)
            {
                model.Id = RegData.Id;
                model.Name = RegData.Name;
                model.Email = RegData.Email;
                model.Mobile = RegData.Mobile;
                model.Message = RegData.Message;
                model.IsActive = RegData.IsActive;
                model.CreateDate = RegData.CreateDate.ToString();

            };
            return model;
        }
        public ContactModel GetDetails(int Id)
        {
            string msg = "";
            ContactModel model = new ContactModel();
            SaiMudraEntities Db = new SaiMudraEntities();
            var RegData = Db.tblContacts.Where(p => p.Id == Id).FirstOrDefault();
            if (RegData != null)
            {
                model.Id = RegData.Id;
                model.Name = RegData.Name;
                model.Email = RegData.Email;
                model.Mobile = RegData.Mobile;
                model.Message = RegData.Message;
                model.IsActive = RegData.IsActive;
                model.CreateDate = RegData.CreateDate.ToString();

            };
            return model;
        }

    }
}