import { FunctionModel } from 'src/domain/models/functions';
import { FunctionEntity } from './../entities/functions.entity';

export class FunctionMapper {
    static toDatabase(_function: FunctionModel): FunctionEntity {
        const functionEntity: FunctionEntity = new FunctionEntity();

        functionEntity.function_id = _function.function_id;
        functionEntity.name = _function.name;
        functionEntity.is_admin = _function.is_admin;
        functionEntity.is_creator_evaluation_realized_reprogrammed = _function.is_creator_evaluation_realized_reprogrammed;
        functionEntity.is_approver_evaluation_realized_reprogrammed = _function.is_approver_evaluation_realized_reprogrammed;
        functionEntity.createdAt = _function.createdAt;
        return functionEntity;
    }

    static toDomain(functionEntity: FunctionEntity): FunctionModel {
        const _function: FunctionModel = new FunctionModel();

        _function.function_id = functionEntity.function_id;
        _function.name = functionEntity.name;
        _function.is_admin = functionEntity.is_admin;
        _function.is_creator_evaluation_realized_reprogrammed = functionEntity.is_creator_evaluation_realized_reprogrammed;
        _function.is_approver_evaluation_realized_reprogrammed = functionEntity.is_approver_evaluation_realized_reprogrammed;
        _function.createdAt = functionEntity.createdAt;
        _function.updatedAt = functionEntity.updatedAt;

        return _function;
    }
}
