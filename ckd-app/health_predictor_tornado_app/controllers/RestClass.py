import tornado.web


class RestClass(tornado.web.RequestHandler):

    @classmethod
    def make_api(self):
        return self