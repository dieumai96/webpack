import { ReplaySubject } from 'rxjs';

const subject = new ReplaySubject(1);

export const eventBusService = {
    sendCallBackCloseModal: callBack => subject.next(callBack),
    clearCallBack: () => subject.next(null),
    getCallBackCloseModal: () => subject.asObservable()
};