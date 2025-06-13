from .models import UserActivity


class AnalyticsMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        
        # Track page views for non-API requests
        if not request.path.startswith('/api/') and not request.path.startswith('/admin/'):
            self.track_page_view(request)
        
        return response

    def track_page_view(self, request):
        try:
            UserActivity.objects.create(
                user=request.user if request.user.is_authenticated else None,
                session_id=request.session.session_key,
                activity_type='page_view',
                metadata={
                    'path': request.path,
                    'method': request.method,
                    'referrer': request.META.get('HTTP_REFERER', ''),
                },
                ip_address=self.get_client_ip(request),
                user_agent=request.META.get('HTTP_USER_AGENT', '')
            )
        except Exception:
            # Silently fail to avoid breaking the request
            pass

    def get_client_ip(self, request):
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0]
        else:
            ip = request.META.get('REMOTE_ADDR')
        return ip