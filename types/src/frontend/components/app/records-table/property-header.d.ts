import React from 'react';
import PropertyJSON from '../../../../backend/decorators/property-json.interface';
declare type Props = {
    property: PropertyJSON;
    /**
     * Property which should be treated as main property.
     */
    titleProperty: PropertyJSON;
    /**
     * currently selected direction. Either 'asc' or 'desc'.
     */
    direction?: 'asc' | 'desc';
    /**
     * currently selected field by which list is sorted.
     */
    sortBy?: string;
    display?: string | Array<string>;
};
declare const PropertyHeader: React.FC<Props>;
export default PropertyHeader;
