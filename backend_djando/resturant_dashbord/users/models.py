    
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin,Group, Permission
from django.utils.translation import gettext_lazy as _
from .managers import CustomUserManager

def user_directory_path(instance, filename):
    # This function determines the upload path for the user's avatar
    return f"profile_images/user_{instance.id}/{filename}"

class User(AbstractBaseUser, PermissionsMixin):
    first_name = models.CharField(_("First Name"), max_length=100)
    last_name = models.CharField(_("Last Name"), max_length=100)
    email = models.EmailField(_("Email Address"), max_length=254, unique=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    date_joined = models.DateTimeField(auto_now_add=True)

    # Define the avatar field with a default image
    avatar = models.ImageField(
        upload_to="profile_images",
        verbose_name='profile picture',
        null=True,
        blank=True,
        default='profile_images/profile_defult.jpg'  # Provide the path to your default image
    )

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["first_name", "last_name"]

    objects = CustomUserManager()
    

    class Meta:
        verbose_name = _("User")
        verbose_name_plural = _("Users")

    def __str__(self):
        return self.email

    @property
    def get_full_name(self):
        return f"{self.first_name} {self.last_name}"
    
    def total_cart_price(self):
        # Calculate the total cart price for the user
        return sum(cart.item_cost for cart in self.shopcart_item.all())

    
    groups = models.ManyToManyField(
    Group,
    verbose_name=_("groups"),
    blank=True,
    help_text=_("The groups this user belongs to."),
    related_name="user_groups",  # Add a related_name to resolve the clash
    )
    user_permissions = models.ManyToManyField(
        Permission,
        verbose_name=_("user permissions"),
        blank=True,
        help_text=_("Specific permissions for this user."),
        related_name="user_permissions_set",  # Add a related_name to resolve the clash
    )


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    # Add other fields related to the user profile

    def __str__(self):
        return str(self.user.first_name + ' ' + self.user.last_name)
    