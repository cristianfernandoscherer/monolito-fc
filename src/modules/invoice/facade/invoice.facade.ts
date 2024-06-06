import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import InvoiceFacadeInterface, {
    GenerateInvoiceFacadeInputDto,
    FindInvoiceFacadeOutputDto,
    FindInvoiceFacadeInputDto,
} from "./invoice.facade.interface";

export interface UseCaseProps {
    findUsecase: UseCaseInterface;
    generateUsecase: UseCaseInterface;
}

export default class InvoiceFacade implements InvoiceFacadeInterface {
    private _generateUsecase: UseCaseInterface;
    private _findUsecase: UseCaseInterface;

    constructor(usecaseProps: UseCaseProps) {
        this._findUsecase = usecaseProps.findUsecase;
        this._generateUsecase = usecaseProps.generateUsecase;
    }

    async generate(input: GenerateInvoiceFacadeInputDto): Promise<void> {
        await this._generateUsecase.execute(input);
    }
    async find(
        input: FindInvoiceFacadeInputDto
    ): Promise<FindInvoiceFacadeOutputDto> {
        return await this._findUsecase.execute(input);
    }
}
