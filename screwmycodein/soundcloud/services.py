from django.db.models import QuerySet

from .models import Soundcloud


class SoundcloudService:
    @staticmethod
    def find_id(id_: str) -> QuerySet:
        return Soundcloud.objects.filter(id=id_)

    @staticmethod
    def find_latest(limit: int) -> QuerySet:
        results = Soundcloud.objects.order_by("-updated_at")
        return results[:limit]

    @staticmethod
    def find_top(limit: int) -> QuerySet:
        results = Soundcloud.objects.order_by("-hits")
        return results[:limit]