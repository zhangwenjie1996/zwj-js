/**
 * ��ֹundefined�ڵͰ汾ie�б���д
 */
;
(function (global, undefined) {
    // ��ֹ�ظ�����
    // ����ñ��ʽ��������ǰ���֮ǰ�����ع�������ֱ��return��ʲô����ִ�С�
    if (global.x) {
        return;
    }

    var x = global.x = {};

    var ajax = function (options) {
        // �жϲ�������
        if (!tools.getType(options, 'Object')) {
            throw new TypeError('�������ʹ���');
        }
        // ajax��һ��
        var xhr = tools.getXHR();

        // ��ʽ��options.data ��data��ʽ��Ϊuri string
        if (options.processData === undefined || options.processData === true) {
            if (tools.getType(options.data, 'Object')) {
                options.data = tools.encodeDataToURI(options.data);
            }
        }

        // �����getϵ���� ��dataƴ�ӵ�url����
        if (/^(get|delete|head)$/img.test(options.method)) {
            options.url = tools.hasSearch(options.url, options.data);
            // �����getϵ�Ͱ�data��գ�˵��ֻ��postϵ����data
            options.data = null;
        }

        // ��������� ��url�����һ�������
        if (options.cache === false) {
            var random = (~~(Math.random() * 0xffffff)).toString(36);
            options.url = tools.hasSearch(options.url, '_=' + random);
        }
        // ���û�д�async����Ĭ��Ϊtrue
        if (options.async === undefined) {
            options.async = true;
        }
        // ajax�ڶ���
        xhr.open(options.method, options.url, options.async, options.username, options.password);

        // �Զ��������ײ�
        tools.forIn(options.headers, function (key, value) {
            xhr.setRequestHeader(key, value);
        });

        // ajax������
        xhr.onreadystatechange = function () {
            // �ж�http�����Ƿ����
            if (xhr.readyState === 4) {
                // �ж�״̬��
                if (/^2\d{2}$/.test(xhr.status)) {
                    var response = xhr.responseText;
                    if (options.dataType === 'json') {
                        // Ϊ�˲��ǺϷ���json�ַ���ִ��jsonparse���׳��쳣
                        try {
                            response = tools.JSONParse(response);
                        } catch (ex) {
                            options.error(ex);
                            return;
                        }
                    }
                    options.success(response);
                }
                else if (/^(4|5)\d{2}$/.test(xhr.status)) {
                    options.error(xhr.status);
                }
            }
        };
        // �ж��Ƿ�ִ�г�ʱ
        if (options.timeout > 0) {
            xhr.timeout = +options.timeout;
            // ��ǰ�����֧�ֳ�ʱ
            if ('ontimeout' in xhr) {
                xhr.ontimeout = function () {
                    options.error();
                }
            } else {
                // �����ʱʱ���ѵ�������http����û�������ǿ����ֹ
                setTimeout(function () {
                    if (xhr.readyState !== 4) {
                        xhr.abort();
                    }
                }, xhr.timeout);
            }
        }
        // ajax���Ĳ�
        xhr.send(options.data);
    };

    var tools = {
        /**
         * ��ȡajax����
         */
        getXHR: (function () {
            var xhrList = [function () {
                return new XMLHttpRequest();
            }, function () {
                return new ActiveXObject('Microsoft.XMLHTTP');
            }, function () {
                return new ActiveXObject('MsXML2.XMLHTTP');
            }, function () {
                return new ActiveXObject('MsXML3.XMLHTTP');
            }];
            var xhr = null;
            while (xhr = xhrList.shift()) {
                try {
                    // �������˵����ǰ�������֧�ָö���
                    xhr();
                    break;
                } catch (ex) {
                    xhr = null;
                    continue;
                }
            }
            // ���ѭ�����֮��xhrΪnull ˵�����ϵ�4�ж��� ��ǰ���������֧��
            if (xhr === null) {
                throw new ReferenceError('��ǰ�������֧��ajax����');
            }
            // ���xhr��Ϊnull xhr��ͷreturn���Ǹ�������ǵ�ǰ���������ʵ��Ǹ�ajax����
            return xhr;
        })(),
        /**
         * �ж���������
         * @param data
         * @param type
         * @returns {boolean}
         */
        getType: function (data, type) {
            return Object.prototype.toString.call(data) === '[object ' + type + ']';
        },
        /**
         * for in ѭ����������
         * @param data
         * @param callback
         */
        forIn: function (data, callback) {
            if (this.getType(data, 'Object')) {
                for (var n in data) {
                    if (!data.hasOwnProperty(n)) continue;
                    callback.call(undefined, n, data[n]);
                }
            }
        },
        /**
         * ��һ�������ʽ��ΪURI string�ĸ�ʽ
         * @param data
         * @returns {string}
         */
        encodeDataToURI: function (data) {
            if (this.getType(data, 'String')) {
                return data;
            }
            var arr = [];
            this.forIn(data, function (key, value) {
                // �ѷ�Ӣ���ַ���ʽ��ΪURI
                arr.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
            });
            return arr.join('&');
        },
        /**
         * ��url����ƴ�Ӳ���
         * @param url
         * @param padString
         * @returns {string}
         */
        hasSearch: function (url, padString) {
            return url + (/\?/.test(url) ? '&' : '?') + padString;
        },
        /**
         * ��json�ַ���ת��Ϊjson����
         * @param jsonString
         * @return {Object}
         */
        JSONParse: function (jsonString) {
            if (!this.getType(jsonString, 'String')) {
                return jsonString;
            }
            if (window.JSON) {
                return JSON.parse(jsonString);
            }
            return eval('(' + jsonString + ')');
        }
    };
    x.ajax = ajax;

})(window);