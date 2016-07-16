export class Entery {  
  constructor(    
    public status: string,
    public tracktor: string,
    public field: string,
    public id?: string,
    public startHours?:number,
    public endHours?:number
  ) { }
};

/**
 * Tracktor
 */
export class Tracktor {
    constructor(
        public id: string,
        public hours: number,
        public name: string
    ) { }

}

/**
 * Field
 */
export class Field {
    constructor(
        public id: string,
        public name: string, 
        public prop: string,
        public color: string
    ) {}
}