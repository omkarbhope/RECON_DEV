from django.contrib import admin
from .models import *
from .models import tbl_location_mst

# Register your models here.
admin.site.register(Tbl_Role_Mst)
admin.site.register(tbl_login_mst)
admin.site.register(Tbl_Country_Mst)
admin.site.register(Tbl_State_Mst)
admin.site.register(Tbl_City_Mst)
admin.site.register(tbl_location_mst)
admin.site.register(tbl_term_mst)
admin.site.register(tbl_company_mst)
admin.site.register(tbl_master)
admin.site.register(Tbl_Uom_Mst)
admin.site.register(tbl_employee_mst)
admin.site.register(tbl_workflow_activity_mst)
admin.site.register(tbl_left_panel)
admin.site.register(tbl_workflow_level_data_mst)
admin.site.register(tbl_workflow_level_data_details)
admin.site.register(tbl_workflow_action_mst)
admin.site.register(tbl_workflow_mst)
