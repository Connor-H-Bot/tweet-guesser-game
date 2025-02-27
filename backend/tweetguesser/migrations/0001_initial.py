# Generated by Django 5.1.1 on 2024-09-21 02:35

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Tweet',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.CharField(max_length=281)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('is_trump', models.BooleanField(default=False)),
            ],
        ),
    ]
