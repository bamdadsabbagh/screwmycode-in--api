from django.db.models import QuerySet

from .models import Bandcamp


class BandcampService:
    @staticmethod
    def find_id(id_: str) -> QuerySet:
        return Bandcamp.objects.filter(id=id_)

    @staticmethod
    def find_latest(limit: int) -> QuerySet:
        results = Bandcamp.objects.order_by("-updated_at")
        return results[:limit]

    @staticmethod
    def find_top(limit: int) -> QuerySet:
        results = Bandcamp.objects.order_by("-hits")
        return results[:limit]