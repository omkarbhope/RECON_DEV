from django.shortcuts import render,get_object_or_404
from rest_framework import viewsets,status
from .models import *
from .serializers import *
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.schemas import views
from rest_framework.response import Response

# Create your views here.
class TermViewSet(viewsets.ModelViewSet):
    serializer_class = TermSerializer
    queryset = tbl_term_mst.objects.all()

class CompanyViewSet(viewsets.ModelViewSet):
    serializer_class = CompanySerializer
    queryset = tbl_company_mst.objects.all()

class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()

class CountryViewSet(viewsets.ModelViewSet):
    queryset = Tbl_Country_Mst.objects.filter(is_deleted='N')
    serializer_class = CountrySerializer        
 
class StateViewSet(viewsets.ModelViewSet):
    serializer_class = StateSerializer
    queryset = Tbl_State_Mst.objects.filter(is_deleted='N')

class CityViewSet(viewsets.ModelViewSet):
    serializer_class = CitySerializer
    queryset = Tbl_City_Mst.objects.filter(is_deleted='N')

class LocationViewSet(viewsets.ModelViewSet):
    serializer_class = LocationSerializer
    queryset = tbl_location_mst.objects.all().filter(is_deleted='N')

    def delete(self):
        self.queryset = tbl_location_mst.objects.filter(self=self).update(is_deleted='Y')

class UOMViewSet(viewsets.ModelViewSet):
    queryset = Tbl_Uom_Mst.objects.filter(is_deleted='N')
    serializer_class = UOMSerializer

    def delete(self):
        self.queryset = Tbl_Uom_Mst.objects.filter(self=self).update(is_deleted='Y')

class MasterViewSet(viewsets.ModelViewSet):
    serializer_class = MasterSerializer
    queryset = tbl_master.objects.all()

class tbl_source_mst_view(viewsets.ModelViewSet):
    queryset = tbl_source_mst.objects.filter(is_deleted='N')
    serializer_class = tbl_source_mst_serializer

class tbl_source_details_view(viewsets.ModelViewSet):
    queryset = tbl_source_details.objects.filter(is_deleted='N')
    serializer_class = tbl_source_details_serializer

    def retrieve(self, request, *args, **kwargs):
        header_ref_id = self.kwargs['pk']
        source_details = tbl_source_details.objects.filter(
            header_ref_id=header_ref_id, is_deleted='N')
        ser = tbl_source_details_serializer(source_details, many=True).data
        return Response(ser, status=status.HTTP_200_OK)

class tbl_reconcilation_definition_mst_view(viewsets.ModelViewSet):
    serializer_class = tbl_reconcilation_definition_mst_serializer
    queryset = tbl_reconcilation_definition_mst.objects.all()

class tbl_reconcilation_definition_details_view(viewsets.ModelViewSet):
    serializer_class = tbl_reconcilation_definition_details_serializer
    queryset = tbl_reconcilation_definition_details.objects.all()

class EmployeeViewSet(viewsets.ModelViewSet):
    serializer_class = EmployeeSerializer
    queryset = tbl_employee_mst.objects.all()

class ActivityViewSet(viewsets.ModelViewSet):
    serializer_class = ActivitySerializer
    queryset = tbl_workflow_activity_mst.objects.all()

class LeftPanelViewSet(viewsets.ModelViewSet):
    serializer_class = LeftPanelSerializer
    queryset = tbl_left_panel.objects.all()

class RoleViewSet(viewsets.ModelViewSet):
    serializer_class = RoleSerializer
    queryset = Tbl_Role_Mst.objects.all()

class LevelViewSet(viewsets.ModelViewSet):
    serializer_class = LevelSerializer
    queryset = tbl_workflow_level_data_mst.objects.all()

class LevelDetailsViewSet(viewsets.ModelViewSet):
    serializer_class = LevelDetailsSerializer
    queryset = tbl_workflow_level_data_details.objects.all()

class ActionViewSet(viewsets.ModelViewSet):
    serializer_class = ActionSerializer
    queryset = tbl_workflow_action_mst.objects.all()

class WorkflowViewSet(viewsets.ModelViewSet):
    serializer_class = WorkflowSerializer
    queryset = tbl_workflow_mst.objects.all()

class ScreenLinkingViewSet(viewsets.ModelViewSet):
    serializer_class = ScreenLinkingSerializer
    queryset = tbl_workflow_screen_linking_mst.objects.all()

class CurrencyViewSet(viewsets.ModelViewSet):
    queryset = Tbl_Currency_Mst.objects.filter(is_deleted='N')
    serializer_class = CurrencySerializer
    # filter_backends = [DjangoFilterBackend]
    filter_fields = ['currency_code','is_deleted']

    def list(self, request, country_id=None):
        if country_id:
            currency = Tbl_Currency_Mst.objects.filter(country_id = country_id, is_deleted='N')
            serializer = self.get_serializer(currency, many=True)
            return Response(serializer.data)
        else:
            currency = Tbl_Currency_Mst.objects.filter(is_deleted='N')
            serializer = self.get_serializer(currency, many=True)
            return Response(serializer.data)