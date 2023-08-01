/*
@license
dhtmlxScheduler.Net v.4.0.0 Professional Evaluation

This software is covered by DHTMLX Evaluation License. Contact sales@dhtmlx.com to get Commercial or Enterprise license. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/
Scheduler.plugin(function(e){!function(){e.config.all_timed="short",e.config.all_timed_month=!1;var t=function(e){return!((e.end_date-e.start_date)/36e5>=24)};e._safe_copy=function(t){var i=null,a=e._copy_event(t);return t.event_pid&&(i=e.getEvent(t.event_pid)),i&&i.isPrototypeOf(t)&&(delete a.event_length,delete a.event_pid,delete a.rec_pattern,delete a.rec_type),a};var i=e._pre_render_events_line,a=e._pre_render_events_table,r=function(e,t){return this._table_view?a.call(this,e,t):i.call(this,e,t);
};e._pre_render_events_line=e._pre_render_events_table=function(i,a){function s(e){var t=n(e.start_date);return+e.end_date>+t}function n(t){var i=e.date.add(t,1,"day");return i=e.date.date_part(i)}function d(t,i){var a=e.date.date_part(new Date(t));return a.setHours(i),a}if(!this.config.all_timed||this._table_view&&"month"!=this._mode||"month"==this._mode&&!this.config.all_timed_month)return r.call(this,i,a);for(var l=0;l<i.length;l++){var o=i[l];if(!o._timed)if("short"!=this.config.all_timed||t(o)){
var h=this._safe_copy(o);h.start_date=new Date(h.start_date),s(o)?(h.end_date=n(h.start_date),24!=this.config.last_hour&&(h.end_date=d(h.start_date,this.config.last_hour))):h.end_date=new Date(o.end_date);var _=!1;h.start_date<this._max_date&&h.end_date>this._min_date&&h.start_date<h.end_date&&(i[l]=h,_=!0);var c=this._safe_copy(o);if(c.end_date=new Date(c.end_date),c.start_date<this._min_date?c.start_date=d(this._min_date,this.config.first_hour):c.start_date=d(n(o.start_date),this.config.first_hour),
c.start_date<this._max_date&&c.start_date<c.end_date){if(!_){i[l--]=c;continue}i.splice(l+1,0,c)}}else"month"!=this._mode&&i.splice(l--,1)}var u="move"==this._drag_mode?!1:a;return r.call(this,i,u)};var s=e.get_visible_events;e.get_visible_events=function(e){return this.config.all_timed&&this.config.multi_day?s.call(this,!1):s.call(this,e)},e.attachEvent("onBeforeViewChange",function(t,i,a,r){return e._allow_dnd="day"==a||"week"==a,!0}),e._is_main_area_event=function(e){return!!(e._timed||this.config.all_timed===!0||"short"==this.config.all_timed&&t(e));
};var n=e.updateEvent;e.updateEvent=function(t){var i,a,r=e.getEvent(t);r&&(i=e.config.all_timed&&!(e.isOneDayEvent(e._events[t])||e.getState().drag_id),i&&(a=e.config.update_render,e.config.update_render=!0)),n.apply(e,arguments),r&&i&&(e.config.update_render=a)}}()});