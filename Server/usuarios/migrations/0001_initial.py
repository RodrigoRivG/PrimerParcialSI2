# Generated by Django 5.2 on 2025-04-17 16:43

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Usuarios',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=55)),
                ('correo', models.CharField(max_length=50, unique=True)),
                ('password', models.TextField()),
                ('rol', models.CharField(max_length=10)),
            ],
            options={
                'db_table': 'usuarios',
                'managed': True,
            },
        ),
    ]
