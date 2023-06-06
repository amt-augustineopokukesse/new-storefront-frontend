import React from "react";
import { setBodyFontSize, setCarouselInclude, setNameFontSize, setOtherFontSize } from "../../../Redux/Templates/ProjectSlice";
import {
  setSecondaryColor,
  setPrimaryColor,
  setBodyFontColor,
  setBodyFontFamily,
  setNameFontFamily,
  } from '../../../Redux/Templates/ProjectSlice';
import { ProjectState } from "../../../Redux/Templates/ProjectInitialState";
import { useAppDispatch } from "../../../store";

export const StylingForm: React.FC<{ project: ProjectState }> = ({ project }) => {
    const dispatch = useAppDispatch();
    const handlePrimaryColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setPrimaryColor(e.target.value));
    };
    
    const handleSecondaryColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setSecondaryColor(e.target.value));
    };
  
    const handleBodyFontColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setBodyFontColor(e.target.value));
    };
  
    const handleHeadingFontChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      dispatch(setNameFontFamily(e.target.value));
    };
    
    const handleBodyFontChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      dispatch(setBodyFontFamily(e.target.value));
    };

    const handleBodyFontSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      dispatch(setBodyFontSize(e.target.value));
    };

    const handleNameFontSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      dispatch(setNameFontSize(e.target.value));
    };

    const handleOtherFontSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      dispatch(setOtherFontSize(e.target.value));
    };
    const handleCarouselToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setCarouselInclude(e.target.value === "on"));
    };
    
    return (
        <form className="form">
        <div className='input-containers'>
          <label className="label">Primary Color</label>
          <input
            type="color"
            value={project.template.primaryColor}
            onChange={handlePrimaryColorChange}
            className="color-input"
          />
        </div>
        <div className='input-containers'>
          <label className="label">Secondary Color</label>
          <input
            type="color"
            value={project.template.secondaryColor}
            onChange={handleSecondaryColorChange}
            className="color-input"
          />
        </div>
        <div className='input-containers'>
          <label className="label">Body Font Color</label>
          <input
            type="color"
            value={project.template.bodyFontColor}
            onChange={handleBodyFontColorChange}
            className="color-input"
          />
        </div>
        <div className='select-containers'>
          <label className="label">Name Font</label>
          <select
            value={project.template.nameFontFamily}
            onChange={handleHeadingFontChange}
            className="select"
          >
            <option value="Poppins, sans-serif">Poppins</option>
            <option value="Helvetica, sans-serif">Helvetica</option>
            <option value="Times New Roman, serif">Times New Roman</option>
          </select>
        </div>
        <div className='select-containers'>
          <label className="label">Body Font</label>
          <select
            value={project.template.bodyFontFamily}
            onChange={handleBodyFontChange}
            className="select"
          >
            <option value="Roboto, sans-serif">Roboto</option>
            <option value="Helvetica, sans-serif">Helvetica</option>
            <option value="Times New Roman, serif">Times New Roman</option>
          </select>
        </div>  

        <div className='select-containers'>
          <label className="label">Name Font Size</label>
          <select
            value={project.template.nameFontSize}
            onChange={handleNameFontSizeChange}
            className="select"
          >
            <option value="96px">96 pixels</option>
            <option value="76px">76 pixels</option>
            <option value="56px">56 pixels</option>
          </select>
        </div>
        <div className='select-containers'>
          <label className="label">Body Font Size</label>
          <select
            value={project.template.bodyFontSize}
            onChange={handleBodyFontSizeChange}
            className="select"
          >
            <option value="24px">24 pixels</option>
            <option value="20px">20 pixels</option>
            <option value="16px">16 pixels</option>
          </select>
        </div>
        <div className='select-containers'>
          <label className="label">Other Font Size</label>
          <select
            value={project.template.otherFontSize}
            onChange={handleOtherFontSizeChange}
            className="select"
          >
            <option value="40px">40 pixels</option>
            <option value="35px">35 pixels</option>
            <option value="30px">30 pixels</option>
          </select>
        </div>  
      <div className="input-containers">
        <label className="label">Carousel:</label>
        <div className="radio-group">
          <input
            type="radio"
            name="carousel"
            value="on"
            checked={project.template.carouselInclude}
            onChange={handleCarouselToggle}
          />
          <label className="radio-label">On</label>
          <input
            type="radio"
            name="carousel"
            value="off"
            checked={!project.template.carouselInclude}
            onChange={handleCarouselToggle}
          />
          <label className="radio-label">Off</label>
        </div>
      </div>    
      </form>
    )
}