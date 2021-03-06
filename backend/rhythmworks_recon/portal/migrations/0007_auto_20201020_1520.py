# Generated by Django 3.1.2 on 2020-10-20 09:50

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('portal', '0006_auto_20201020_1518'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tbl_city_mst',
            name='state_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='cities', to='portal.tbl_state_mst', verbose_name='State ID'),
        ),
    ]
