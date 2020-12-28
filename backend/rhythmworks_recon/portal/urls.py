from django.urls import include, path
from rest_framework import routers
from . import views
from drf_jwt_2fa.views import obtain_auth_token, obtain_code_token, refresh_auth_token

router = routers.DefaultRouter()
router.register(r'country', views.CountryViewSet)
router.register(r'state', views.StateViewSet, basename='state')
router.register(r'city', views.CityViewSet, basename='city')
router.register(r'location', views.LocationViewSet, basename='location')
router.register(r'term', views.TermViewSet, basename = 'term')
router.register(r'company', views.CompanyViewSet, basename = 'company')
router.register(r'user', views.UserViewSet, basename='user')
router.register(r'master', views.MasterViewSet, basename='master')
router.register(r'srcmaster', views.tbl_source_mst_view)
router.register(r'srcdetails', views.tbl_source_details_view)
router.register(r'reconmst', views.tbl_reconcilation_definition_mst_view)
router.register(r'recondet', views.tbl_reconcilation_definition_details_view)
router.register(r'uom', views.UOMViewSet)
router.register(r'employee', views.EmployeeViewSet)
router.register(r'activity', views.ActivityViewSet)
router.register(r'role', views.RoleViewSet)
router.register(r'left-panel', views.LeftPanelViewSet)
router.register(r'level', views.LevelViewSet)
router.register(r'level-details', views.LevelDetailsViewSet)
router.register(r'action', views.ActionViewSet)
router.register(r'workflow', views.WorkflowViewSet)
router.register(r'screen-link', views.ScreenLinkingViewSet)
router.register(r'currency', views.CurrencyViewSet)

urlpatterns = [
    path('auth/code/', obtain_code_token),
    path('auth/login/', obtain_auth_token),
    path('auth/refresh-token/', refresh_auth_token),
    path('', include(router.urls)),
]
