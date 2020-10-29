from .models import *
from rest_framework import serializers
from re import T
from django.contrib.auth.models import User
from rest_framework import fields

class LoginMasterSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = tbl_login_mst
        fields  = ('__all__')

    def get(user):
        return tbl_login_mst.objects.get(user = user)

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('__all__')
    def get(username):
        return User.objects.get(username = username)

class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tbl_Role_Mst
        fields = ('__all__')

    def get(role):
        return Tbl_Role_Mst.objects.get(id = role.id)

class TermSerializer(serializers.ModelSerializer):
    class Meta:

        model = tbl_term_mst
        fields = ('__all__')

class CompanySerializer(serializers.ModelSerializer):
    class Meta:

        model = tbl_company_mst
        fields = ('__all__')

class MasterSerializer(serializers.ModelSerializer):
    class Meta:
        model = tbl_master
        fields = ('__all__')

class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = tbl_location_mst
        fields = ('__all__') 

class CitySerializer(serializers.ModelSerializer):
    locations = LocationSerializer(many=True, read_only=True)

    class Meta:
        model = Tbl_City_Mst
        fields = ('__all__')

class StateSerializer(serializers.ModelSerializer):
    cities = CitySerializer(many=True, read_only=True)
    class Meta:
        model = Tbl_State_Mst
        fields = ('__all__')

class CountrySerializer(serializers.ModelSerializer):
    states = StateSerializer(many=True, read_only=True)
    class Meta:
        model = Tbl_Country_Mst
        fields = ('__all__')

class UOMSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tbl_Uom_Mst
        fields = '__all__'

class tbl_source_mst_serializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()

    class Meta:
        model = tbl_source_mst
        fields = '__all__'

class tbl_source_details_serializer(serializers.ModelSerializer):
    # id = serializers.ReadOnlyField()

    class Meta:
        model = tbl_source_details
        fields = ('id',
                  'field_name',
                  'section_identifier_id',
                  'header_ref_id'
                  )

class tbl_reconcilation_definition_details_serializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)

    class Meta:
        model = tbl_reconcilation_definition_details
        fields = '__all__'

class tbl_reconcilation_definition_details_serializer1(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)

    class Meta:
        model = tbl_reconcilation_definition_details
        fields = '__all__'


class tbl_reconcilation_definition_mst_serializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)
    initialItemRow = tbl_reconcilation_definition_details_serializer(many=True)
    # initialItemRow1 = tbl_reconcilation_definition_details_serializer1(many=True)

    # initialItemRow1 = tbl_reconcilation_definition_details_serializer(many=True)

    # reconcilationdetails = []

    class Meta:
        model = tbl_reconcilation_definition_mst
        fields = '__all__'

    def create(self, validated_data):
        initialItemRow = validated_data.pop('initialItemRow')
        # initialItemRow1 = validated_data.pop('initialItemRow1')
        
        # reconcilationdetails = initialItemRow + initialItemRow1
        # initialItemRow.extend(initialItemRow1)
        print(initialItemRow)

        sourceMaster = tbl_reconcilation_definition_mst.objects.create(**validated_data)
        for item in initialItemRow:
            tbl_reconcilation_definition_details.objects.create(**item, header_ref_id=sourceMaster)
        # for item in initialItemRow1:
        #     tbl_reconcilation_definition_details.objects.create(**item, header_ref_id=sourceMaster)
        return sourceMaster

class EmployeeSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)
    class Meta:
        model = tbl_employee_mst
        fields = ('__all__')