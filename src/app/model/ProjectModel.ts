import {Column, HasMany, Model, Table} from "sequelize-typescript";

@Table({tableName: "project"})
export class Project extends Model<Project> {
    static sequelize: any;

    @Column({
        allowNull: false,
        field: "id_project",
        comment : 'Id Project'
    })
    idProject: number;

    @Column( { allowNull: false, field: "name_project"  } )
    nameProject: string;

}