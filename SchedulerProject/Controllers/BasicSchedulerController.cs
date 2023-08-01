using DHTMLX.Common;
using DHTMLX.Scheduler;
using DHTMLX.Scheduler.Data;
using SchedulerProject.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SchedulerProject.Controllers
{
    public class BasicSchedulerController : Controller
    {
        public ActionResult Index()
        {
            //takvim detayları döndürürüz.
            var sched = new DHXScheduler(this);
            sched.Skin = DHXScheduler.Skins.ContrastBlack;
            sched.LoadData = true;
            sched.EnableDataprocessor = true;
            sched.InitialDate = new DateTime(2023, 8, 1);
            return View(sched);
        }
        public ContentResult Data()
        {
            //Bu kodlar, "SchedulerAjaxData" adında bir nesne oluşturuyor ve bu nesneyi bir Ajax yanıtı olarak döndürüyor.
            //Oluşturulan yanıt, "SchedulerContext" nesnesi içindeki "Events" özellikteki verileri seçerek bir dizi şeklinde oluşturuyor.
            //Her bir etkinlik için sadece "id", "text", "start_date" ve "end_date" özelliklerini içeren bir anonim nesne oluşturuyor.
            //Bu şekilde, etkinlik verileri Ajax yanıtı içinde kullanılmak üzere hazırlanmış oluyor.
            return (new SchedulerAjaxData(
                new SchedulerContext().Events
                .Select(e => new { e.id, e.text, e.start_date, e.end_date })
                )
                );
        }

        public ContentResult Save(int? id, FormCollection actionValues)
        {
            
            var action = new DataAction(actionValues);
            var changedEvent = DHXEventsHelper.Bind<Event>(actionValues);
            var entities = new SchedulerContext();
            try
            {
                switch (action.Type)
                {
                    //ekleme kısmı
                    case DataActionTypes.Insert:
                        entities.Events.Add(changedEvent);
                        break;
                        //silme kısmı
                    case DataActionTypes.Delete:
                        changedEvent = entities.Events.FirstOrDefault(ev => ev.id == action.SourceId);
                        entities.Events.Remove(changedEvent);
                        break;
                    default://güncelleme kısmı
                        var target = entities.Events.Single(e => e.id == changedEvent.id);
                        DHXEventsHelper.Update(target, changedEvent, new List<string> { "id" });
                        break;
                }
                entities.SaveChanges();
                action.TargetId = changedEvent.id;
            }
            catch (Exception a)
            {
                action.Type = DataActionTypes.Error;
            }

            return (new AjaxSaveResponse(action));
        }
    }
}
