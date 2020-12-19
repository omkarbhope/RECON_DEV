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

class ActivitySerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)
    class Meta:
        model = tbl_workflow_activity_mst
        fields = ('__all__')

class LeftPanelSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)
    class Meta:
        model = tbl_left_panel
        fields = ('__all__')

class LevelDetailsSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)
    class Meta:
        model = tbl_workflow_level_data_details
        fields = ('__all__')

class LevelSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)

    initialItemRow = LevelDetailsSerializer(many=True)
    class Meta:
        model = tbl_workflow_level_data_mst
        fields = ('__all__')

    def create(self, validated_data):
        initialItemRow = validated_data.pop('initialItemRow')
        level = tbl_workflow_level_data_mst.objects.create(**validated_data)

        for item in initialItemRow:
            tbl_workflow_level_data_details.objects.create(**item, header_ref_id=level)
        return level

    def update(self, instance, validated_data):
        object = tbl_workflow_level_data_mst.objects.get(id=validated_data['id'])
        initialItemRow = validated_data.pop('initialItemRow')

        instance.level = validated_data.get('level', instance.level)
        instance.sub_application_id = validated_data.get('sub_application_id', instance.sub_application_id)
        instance.application_id = validated_data.get('application_id', instance.application_id)
        instance.is_deleted = validated_data.get('is_deleted', instance.is_deleted)
        instance.updated_date_time = validated_data.get('updated_date_time', instance.updated_date_time)
        instance.save()

        updated_data = []

        for init in initialItemRow:
            if "id" in init.keys():
                if tbl_workflow_level_data_details.objects.filter(id=init['id']).exists():
                    det = tbl_workflow_level_data_details.objects.get(id=init['id'])
                    activity_ref_id = init.get('activity_ref_id',det.activity_ref_id)
                    sequence_number = init.get('sequence_number',det.sequence_number)
                    action_ref_id = init.get('action_ref_id',det.action_ref_id)
                    next_sequence_number = init.get('next_sequence_number',det.next_sequence_number)
                    det.created_date_time = init.get('created_date_time', det.created_date_time)
                    det.is_deleted = init.get('is_deleted', det.is_deleted)
                    det.updated_date_time = init.get('updated_date_time', det.updated_date_time)
                    det.application_id = init.get('application_id', det.application_id)
                    det.sub_application_id = init.get('sub_application_id', det.sub_application_id)
                    det.save()
                    updated_data.append(det.id)
                else:
                    continue
            else:
                det = tbl_workflow_level_data_details.objects.create(**init, header_ref_id=instance)
                updated_data.append(det.id)

        det = tbl_workflow_level_data_details.objects.filter(header_ref_id=object.id)
        det_id = [d.id for d in det]

        for d in det_id:
            if d in updated_data:
                continue
            else:
                det_record = tbl_workflow_level_data_details.objects.get(id=d)
                print(det_record)
                det_record.is_deleted = 'Y'
                print(det_record.is_deleted,'nnnnnnnnnnnnnn')
                det_record.save()
        return instance



class ActionSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)
    class Meta:
        model = tbl_workflow_action_mst
        fields = ('__all__')

class WorkflowSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)
    class Meta:
        model = tbl_workflow_mst
        fields = ('__all__')
