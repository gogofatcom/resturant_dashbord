"""
Django settings for resturant_dashbord project.

Generated by 'django-admin startproject' using Django 5.0.

For more information on this file, see
https://docs.djangoproject.com/en/5.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/5.0/ref/settings/
"""

from pathlib import Path
from datetime import timedelta
# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-6ni%=-sw*et(l^xs24qndcasgfwmjq@@*qwq5mj^gq=kyg8jsi'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []


# Application definition

INSTALLED_APPS = [
   
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    'catagyres',
    'orderOftable',   
    'ordercart',
     'userProfile',
   
    'djoser',
    "rest_framework_simplejwt",
    'rest_framework',
    'rest_framework.authtoken',
    'corsheaders',
    # 'rest_framework.authtoken',       
]


MIDDLEWARE = [
      'django.contrib.sessions.middleware.SessionMiddleware',
        'django.contrib.auth.middleware.AuthenticationMiddleware',

    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',


    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]
REST_FRAMEWORK = {
   'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
        # ... other authentication classes
    ],
}





CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",  # Add the URL of your React app
]
# AUTHENTICATION_BACKENDS = [
#     'django.contrib.auth.backends.ModelBackend',
# ]

SESSION_ENGINE = 'django.contrib.sessions.backends.db'
CORS_ORIGIN_ALLOW_ALL = True

ROOT_URLCONF = 'resturant_dashbord.urls'
AUTH_USER_MODEL = 'userProfile.CustomUser'

# Allow credentials in the CORS headers if you are using them
CORS_ALLOW_CREDENTIALS = True

SIMPLE_JWT = {
    "AUTH_HEADER_TYPES": (
        "Bearer",
        "JWT"),
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=360),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=60),
    "SIGNING_KEY": "BWrz80LirzsZTvRSjHKJRljSK2mCOJmg",
    "AUTH_HEADER_NAME": "HTTP_AUTHORIZATION",
    "AUTH_TOKEN_CLASSES": ("rest_framework_simplejwt.tokens.AccessToken",),
}

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'resturant_dashbord.wsgi.application'


# Database
# https://docs.djangoproject.com/en/5.0/ref/settings/#databases

DATABASES = {
     'default': {
   'ENGINE': 'django.db.backends.postgresql',
        'HOST': 'localhost',
        'NAME': 'resturantadmindashbord',
        'USER': 'postgres',
        'PASSWORD': '12344321',
        'PORT': 5432    }

    # 'default': {
    #     'ENGINE': 'django.db.backends.sqlite3',
    #     'NAME': BASE_DIR / 'db.sqlite3',
    # }

    
}
import os


STATIC_ROOT=os.path.join(BASE_DIR,"static_cdn","static_root")

MEDIA_ROOT = os.path.join(os.path.dirname(BASE_DIR), 'mediafiles')

# URL used to access the media
MEDIA_URL = '/media/'



# Password validation
# https://docs.djangoproject.com/en/5.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/5.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.0/howto/static-files/

STATIC_URL = 'static/'

# Default primary key field type
# https://docs.djangoproject.com/en/5.0/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


